/** @format */
import { useState, useEffect } from 'react'
import alert from '@components/Toast'
import CryptoJS from 'crypto-js'
import { getRandomRedirectUrl } from '@utils/redirect'
import { post, get } from '@utils/request'

// checkout 订单状态
export const ORDER_STATUS = {
  PENDING: 2,
  DETECTED: 10,
  WAIT_AUTH: 11,
  PAID: 3,
  FAILED: 8,
}

function removeQueryParams() {
  const url = new URL(window.location.href)
  url.search = ''
  // 替换当前历史记录
  history.replaceState({}, '', url)
}

const useHandlers = () => {
  const [ordering, setOrdering] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const id = params.get('Ref')

  const getOrderStatus = async (id) => {
    if (!id) return
    try {
      setOrdering(true)
      const res = await get(`/users/me/orders/${id}`)
      const data = res.data ?? {}
      const { status, statusDes } = data
      if (status === ORDER_STATUS.PAID) {
        alert.success('payment successful')
        removeQueryParams()
        setOrdering(false)
        // 订单失败了
      } else if (status === ORDER_STATUS.FAILED) {
        removeQueryParams()
        setOrdering(false)
        alert.error(statusDes)
      } else {
        getOrderStatus(id)
      }
    } catch (err) {
      setOrdering(false)
      alert.error(err.message)
    }
  }

  // 创建订单
  const createOrder = async (product, channelData) => {
    try {
      setOrdering(true)

      // 不同的域名一个做A，一个做B，后台不区分都返回extra, extra是base64编码的B站域名
      // 如果后台对于A站不返回extra就更好了
      // 当前是A站
      const encryptKey = import.meta.env.PUBLIC_PAYMENT_ENCRYPT_KEY
      const { extra } = channelData
      const domain = window.atob(extra)
      let mineIsA = false
      if (domain && domain !== window.location.origin) {
        mineIsA = true
      }

      // 无论是否要回退到A站，这里都补充bl保持一致
      const url = mineIsA ? domain : window.location.origin
      const blSuccess = `${window.btoa(
        CryptoJS.AES.encrypt(
          window.location.origin + '/payment?status=success',
          encryptKey
        )
      )}`
      const blCancel = `${window.btoa(
        CryptoJS.AES.encrypt(
          window.location.origin + '/payment?status=cancel',
          encryptKey
        )
      )}`
      const returnUrl = `${url}/payment?status=success&bl=${blSuccess}`
      const cancelUrl = `${domain}/payment?status=cancel&bl=${blCancel}`

      const { id, quantity } = product
      const params = {
        productId: id,
        channel: 23,
        quantity,
        region: 'USA',
        currency: 'USD',
        returnUrl,
        cancelUrl,
      }
      // 创建订单
      const { data, success, errorMsg } = await post('/users/me/orders', params)
      if (!success) {
        alert.error(errorMsg)
      }
      console.log(`payUrl: ${data?.payUrl}`)
      if (data?.payUrl) {
        if (mineIsA) {
          // 通过跳板再跳到B站
          const url = new URLSearchParams()
          url.append(
            'url',
            `${domain}/payment?payUrl=${window.btoa(
              CryptoJS.AES.encrypt(data.payUrl, encryptKey)
            )}`
          )
          // url.append(
          //   "url",
          //   `http://localhost:3000/payment?payUrl=${window.btoa(
          //     CryptoJS.AES.encrypt(data.payUrl, encryptKey)
          //   )}`
          // );
          location.href = getRandomRedirectUrl(url.toString())
        } else {
          location.href = data.payUrl
        }
      }
    } catch (err) {
      alert.error(err.message)
    } finally {
      setOrdering(false)
    }
  }

  useEffect(() => {
    try {
      if (id) {
        getOrderStatus(id)
      }
    } catch (err) {}
  }, [id])

  return {
    ordering,
    createOrder,
  }
}

export default useHandlers
