import { createPortal } from 'react-dom'

import { useStore } from './store'
import useHandlers from './useHandlers'

import {Loading} from './Icons'

const LoadingMask = () => {
  const store = useStore()
  useHandlers()

  if (!store.ordering) {
    return null
  }

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#000c]">
      <div className="flex h-full w-full flex-col items-center justify-center text-white">
        <Loading width={80} height={80} />
        <div className="mt-2 text-base text-white">Payment processing…</div>
      </div>
    </div>,
    document.body
  )
}

export default LoadingMask
