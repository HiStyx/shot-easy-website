import qs from "qs";
import { v4 as uuidv4 } from "uuid";

import website from "../configs/website.json";
import cookie from "./cookie";

const FORM_URLENCODED = "application/x-www-form-urlencoded; charset=UTF-8";
const LOCALE_KEY = "locale";

if (typeof window !== "undefined") {
  const deviceId = localStorage.getItem("deviceId") || uuidv4();
  localStorage.setItem("deviceId", deviceId);
}

function compose_headers(
  headers: { cookie?: string },
  isFormData: boolean
): Headers {
  const isBrowser = typeof document !== "undefined";
  const baseHeaders = new Headers();
  baseHeaders.append("X-Request-With", "XMLHttpRequest");

  const cookieText = isBrowser ? document.cookie : headers?.cookie;
  const token = cookie.get(website.access_token_key, cookieText || "");
  if (token) {
    baseHeaders.append(website.auth_header, token);
  }

  const deviceId = localStorage.getItem("deviceId");
  if (deviceId) {
    baseHeaders.append(website.device_id_key, deviceId);
  }

  const locale = cookie.get(website.locale_key, cookieText || "");
  baseHeaders.append("Accept-Language", locale || "en");

	const cfCountryCode = isBrowser
		? window.cf_country_code || 'HK'
		: cookie.get('cf_country_code', cookieText || '')
	if (process.env.NODE_ENV === 'development') {
		baseHeaders.append('X-COUNTRY', 'HK')
	} else {
		cfCountryCode && baseHeaders.append('X-COUNTRY', cfCountryCode)
	}

  if (headers) {
    for (const key in headers) {
      if (key !== "cookie") {
        baseHeaders.set(key, headers[key]);
      }
    }
  }

  if (!isFormData) {
    if (!baseHeaders.get("Content-Type")) {
      baseHeaders.set("Content-Type", FORM_URLENCODED);
    }
  }

  return baseHeaders;
}

function compose_url(url: string, basePath = ""): string {
  return url?.startsWith("http") ? url : basePath + url;
}

function appendQuery(url: string, query: string): string {
  const sp = url.includes("?") ? "&" : "?";
  return `${url}${sp}${query}`;
}

const generator = (
  method = "GET",
  basePath = import.meta.env.PUBLIC_BACKEND_URL
) => {
  console.log(basePath);
  /**
   * url 最好不要带参数，GET 也使用 params
   */
  const request = async <D>(
    url: string,
    params = {},
    headers = {},
    otherOptions = null
  ): Promise<any> => {
    const isFormData =
      typeof FormData !== "undefined" && params instanceof FormData;
    const customHeaders = compose_headers(headers, isFormData);
    let locale = "";
    if (typeof window !== "undefined") {
      locale = customHeaders.get("Accept-Language") ?? "";
      customHeaders.delete("Accept-Language");
    }
    // 第三方
    if (url.startsWith("http")) {
      customHeaders.delete(website.auth_header);
    }

    const options: any = {
      method: method,
      headers: customHeaders,
      // fetch请求接口偶先使用缓存，禁用缓存
      cache: "no-store",
    };

    // 个别请求不能带?
    if (method === "GET") {
      const qString = qs.stringify({ [LOCALE_KEY]: locale, ...params });
      url = `${url}${qString ? "?" + qString : ""}`;
    } else {
      // aws forbid this
      // Query String Parameters not allowed on POST requests.
      if (!url.includes("amazonaws.com")) {
        url = appendQuery(url, `${LOCALE_KEY}=${locale}`);
      }

      if (isFormData) {
        options.body = params;
      } else {
        // 后台对象只允许点，数组中括号
        options.body = options?.headers?.get("Content-Type")?.includes("json")
          ? JSON.stringify(params)
          : qs.stringify(params, { allowDots: true });
      }
    }

    let json,
      err,
      response = new Response();
    try {
      response = await fetch(compose_url(url, basePath), options);
      if (response.ok) {
        if (response.status === 200) {
          if (otherOptions?.blob) {
            json = response;
            return json;
          }
          json = await response.json();
          const {
            errorCode: code,
            errorMsg: message = "Request error",
            success,
          } = json;
          // success 判断更简单，方便 mock
          if (!success) {
            err = { message, code, statusText: response.statusText };
          }
          // aws upload file will return 204 No content
        } else if (response.status == 204) {
          json = {
            success: true,
          };
        }
      } else {
        const { errorCode, errorMsg, data } = await response.json();
        if (response.status === 400 && errorCode === 2) {
          err = {
            message:
              errorMsg +
              ":" +
              (data || [])
                .map((i) => i.field + " " + i.defaultMessage)
                .join(","),
            code: response.status,
          };
        } else {
          err = {
            message: response.statusText || "Request error",
            code: response.status,
          };
        }
      }
    } catch (error) {
      err = {
        message: error.message,
        code: response?.status || 0,
        statusText: response?.statusText || "Network error",
      };
    }

    if (err) {
      if (err.code === 401) {
        if (
          typeof window !== "undefined" &&
          location.pathname !== "/" &&
          location.pathname !== "/ai-chat/conversations"
        ) {
          location.href = "/"; //登录态丢失默认跳转到首页，防止登录才能访问的页面保留
        }
        // 打开登录弹窗
        globalThis.handleAuth?.(); //打开登录弹窗
      }
      return Promise.reject(err);
    }

    // 直接返回全部 json，有些场景需要 data 之外的数据
    return json;
  };

  return request;
};

export const get = generator();

export const post = generator("POST");

export const put = generator("PUT");

export const del = generator("DELETE");

export const pat = generator("PATCH");

export const createInstance = (apiUrl?: string) => {
  return {
    get: apiUrl ? generator("GET", apiUrl) : get,
    post: apiUrl ? generator("POST", apiUrl) : post,
    put: apiUrl ? generator("PUT", apiUrl) : put,
    del: apiUrl ? generator("DELETE", apiUrl) : del,
    pat: apiUrl ? generator("PATCH", apiUrl) : pat,
  };
};
