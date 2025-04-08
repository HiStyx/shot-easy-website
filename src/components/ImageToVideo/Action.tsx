import React from 'react'
import type { ICharge } from './controllers/interfaces'

interface ActionProps {
  disabled: boolean
  generating: boolean
  charge: ICharge
}

const Action: React.FC<ActionProps> = ({ disabled, generating, charge }) => {
  return (
    <div className="h-20 py-3 xl:px-6">
      <div className={`h-11 w-full rounded-xl ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}>
        <button
          className="!min-h-11 text-white btn relative !h-11 w-full overflow-hidden bg-primary-500 text-sm !leading-[44px]"
          type={disabled || generating ? 'button' : 'submit'}
        >
          {generating && <span className="loading-spinner loading-xs loading" />}
          Generate
          {charge && (
            <span
              className={`absolute right-0 top-0 flex items-center gap-1 rounded rounded-tr-xl bg-[rgb(166,47,228)] px-1 text-xs text-white`}
            >
               {charge?.creditConsumption} credits
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Action
