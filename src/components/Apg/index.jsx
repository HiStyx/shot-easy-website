

import Modal from './Modal'
import OrderButton from './OrderButton'
import { StoreProvider } from './store'
import LoadingMask from './LoadingMask'


export default function Checkout({ product, extra }) {
  return (
    <StoreProvider>
      <OrderButton />
      <Modal product={product} extra={extra} />
      <LoadingMask />
    </StoreProvider>
  )
}
