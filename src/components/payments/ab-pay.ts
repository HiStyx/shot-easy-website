import { getDecrypt } from "@utils/crypto";

export const getParams = (key: string) => {
  let urlSearchParams: URLSearchParams;
  if (location.search.includes("spOrderId")) {
    urlSearchParams = new URLSearchParams(location.search);
  } else if (sessionStorage.getItem("myParams")) {
    urlSearchParams = new URLSearchParams(sessionStorage.getItem("myParams"));
  } else {
    return "";
  }

  const value = urlSearchParams.get(key);
  if (key === "returnUrl") {
    return getDecrypt(window.atob(value), "_onerway_");
  }

  return value;
};

export const getOrderParamsFromA = () => {
  const spOrderId = getParams("spOrderId");
  const id = getParams("id");
  const type = Number(getParams("type"));
  const name = getParams('name')
  const price = getParams('price')

  if (spOrderId && id) {
    return { spOrderId, id, type, name, price };
  }
};

export const goToA = (failed = false) => {
  if (failed) {
    // 支付失败，跳转回订单页面，不带订单轮询
    location.href = `${getParams("returnUrl")}`;
    return
  }
  // id 为后台订单 id，spOrderId 为支付商交易 id
  const { id, spOrderId } = getOrderParamsFromA() || {};
  if (spOrderId && id) {
    setTimeout(() => {
      sessionStorage.removeItem("myParams");
    }, 0);
    location.href = `${getParams(
      "returnUrl"
    )}?transaction_id=${spOrderId}&order_id=${id}`;
  }
};
