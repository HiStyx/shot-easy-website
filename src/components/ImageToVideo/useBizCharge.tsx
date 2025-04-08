import { useEffect, useState } from 'react'

import { getBizCharge } from './controllers'
import { BizType } from './controllers/enums'
import type { ICharge } from './controllers/interfaces'

interface UseBizChargeProps {
  category: BizType
  duration: number
  isLoggedIn: boolean
}

export const useBizCharge = ({ category, duration, isLoggedIn }: UseBizChargeProps) => {
  const [charge, setCharge] = useState<ICharge>(null)

  useEffect(() => {
    const _getCharge = async () => {
      try {
        const res = await getBizCharge(category, duration)
        setCharge(res)
      } catch (err) {
        //
      }
    }

    isLoggedIn && _getCharge()
  }, [category, duration, isLoggedIn])

  return { charge }
}

export default useBizCharge
