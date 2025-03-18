import { useMemoizedFn } from 'ahooks'

import alert from '@components/Toast'
import { get, post } from '@utils/request'

import { ORDER_STATUS } from './enums'
import { useDispatch } from './store'

function removeQueryParams() {
	const url = new URL(window.location.href)
	url.search = ''
	// 替换当前历史记录
	history.replaceState({}, '', url)
}

const useHandlers = () => {
  const dispatch = useDispatch()

  const getOrderStatus = useMemoizedFn(async (id) => {
    if (!id) return
    try {
      dispatch({
        type: 'ORDERING',
        payload: true
      })
      const res = await get(`/users/me/orders/${id}`)
      const data = res.data ?? {}
      const { status, statusDes } = data
      if (status === ORDER_STATUS.PAID) {
        dispatch({
          type: 'ORDERING',
          payload: false
        })
        alert.success('Payment successful')
        removeQueryParams()
        // 订单失败了
      } else if (status === ORDER_STATUS.FAILED) {
        dispatch({
          type: 'ORDERING',
          payload: false
        })
        alert.error(statusDes)
        removeQueryParams()
      } else {
        setTimeout(() => {
          getOrderStatus(id)
        }, 2000)
      }
    } catch (err) {
      dispatch({
        type: 'ORDERING',
        payload: false
      })
      alert.error(err.message)
    }
  })

  // 创建订单
  const createOrder = async (form, product) => {
    try {
      dispatch({
        type: 'ORDERING',
        payload: true
      })

      const payInfo = {
        carNo: form.card_number,
        expYear: form.expiry_year,
        expMonth: form.expiry_month,
        cvv: form.cvv,
        firstName: form.first_name,
        lastName: form.last_name
      }
      const { id, quantity } = product
      const params = {
        productId: id,
        channel: 20,
        quantity,
        region: 'USA',
        currency: 'USD',
        apgExtra: payInfo,
      }

      // 创建订单
      const { data, success, errorMsg } = await post('/users/me/orders', params)
      if (!success) {
        return alert.error(errorMsg)
      }
      getOrderStatus(data?.id)
      dispatch({
        type: 'CLOSE_MODAL'
      })
    } catch (err) {
      alert.error(err.message)
    } finally {
      dispatch({
        type: 'ORDERING',
        payload: false
      })
    }
  }

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' })
  }

  return {
    openModal,
    createOrder
  }
}

export default useHandlers
