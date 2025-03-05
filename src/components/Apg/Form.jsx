import { useRef } from 'react'

import { useMemoizedFn } from 'ahooks'

import InputField from './InputField'
import { FORM_FIELDS } from './enums'
import { Card, CVV, Loading } from './Icons'
import { useStore } from './store'
import useHandlers from './useHandlers'
import { validators } from './validators'


const years = new Array(27).fill(0).map((_, i) => (new Date().getFullYear() + i).toString())
const months = new Array(12).fill(0).map((_, i) => (i + 1).toString().padStart(2, '0'))

const CreditCardForm = ({ product, extra }) => {
  const { createOrder } = useHandlers()
  const store = useStore()
  const { form, ordering, errorDes } = store

  const formRef = useRef(null)

  const submit = useMemoizedFn((e) => {
    e.preventDefault()

    const params = {}
    const errors = []

    FORM_FIELDS.forEach((name) => {
      if (name === 'prefix') {
        params[name] = form[name].value || '+1'
        return
      }

      const event = new Event('input', { bubbles: true })
      e.target[name]?.dispatchEvent?.(event)

      if (!form[name].value || form[name].errorMsg) {
        errors.push(name)
      } else {
        params[name] = form[name].value
      }
    })
    params.card_number = params.card_number?.replace(/\s/g, '')
    if (errors.length > 0) {
      console.log('errors', errors, params)
    } else {
      createOrder(params, product, extra)
    }
  })

  return (
    <div className="checkout-form">
      <form className="space-y-2 lg:space-y-3" onSubmit={submit} noValidate ref={formRef}>
        <div className="flex space-x-2 xl:space-x-3">
          <InputField
            placeholder="First Name on Card"
            validator={(val) => validators.notEmpty(val)}
            name="first_name"
            maxLength="50"
            required
            disabled={ordering}
          />
          <InputField
            placeholder="Last Name on Card"
            validator={(val) => validators.notEmpty(val)}
            name="last_name"
            maxLength="50"
            required
            disabled={ordering}
          />
        </div>
        <div className="relative">
          <InputField
            placeholder="1234 1234 1234 1234"
            alwayShowPlaceholder={false}
            validator={(val) => validators.cardNumber(val)}
            name="card_number"
            maxLength="19"
            required
            disabled={ordering}
          />
          <div className="absolute right-3 top-3 flex space-x-1">
            <Card />
          </div>
          <div className="mt-3 flex gap-2 xl:gap-3">
            <div className="flex flex-1 gap-2 xl:gap-3">
              <div className="flex-1">
                <InputField
                  placeholder="MM"
                  type="text"
                  list="months"
                  validator={(val) => {
                    const year = form.expiry_year.value
                    if (year && year.length === 4) {
                      const date = new Date(year, parseInt(val), 1)
                      if (date.getTime() < new Date().getTime()) {
                        return 'Invalid option'
                      }
                      /**
                       * 不要 dispatchEvent，循环验证时会导致死循环
                       * 但是会导致另外一个问题：
                       * 修改 expiry_month 后，expiry_year 合法性不会自动更新
                       * 先忽略这种情况
                       */
                    }

                    return validators.option(val, months)
                  }}
                  datalist={months}
                  name="expiry_month"
                  maxLength="2"
                  required
                  disabled={ordering}
                />
              </div>
              <div className="flex-1">
                <InputField
                  placeholder="YYYY"
                  type="text"
                  list="years"
                  maxLength="4"
                  validator={(val) => {
                    const month = form.expiry_month.value
                    if (month && month.length === 2) {
                      const date = new Date(val, parseInt(month), 1)
                      if (date.getTime() < new Date().getTime()) {
                        return 'Invalid option'
                      } else {
                        const event = new Event('input', { bubbles: true })
                        formRef.current['expiry_month'].dispatchEvent(event)
                      }
                    }

                    return validators.option(val, years)
                  }}
                  datalist={years}
                  name="expiry_year"
                  required
                  disabled={ordering}
                />
              </div>
            </div>
            <div className="relative flex-1">
              <InputField
                placeholder="CVV"
                type="text"
                name="cvv"
                validator={(val) => validators.reg(val, /^\d{3,4}$/)}
                maxLength="4"
                required
                disabled={ordering}
              />
              <div className="absolute right-3 top-3">
                <CVV />
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-error">{errorDes}</div>
        <button
          type={ordering ? 'button' : 'submit'}
          className='mt-6 inline-flex w-full items-center justify-center gap-1 rounded-[12px] border-0 text-white p-3 font-bold bg-primary-600 hover:bg-primary-700 focus:border-0 focus:outline-none'
        >
          {ordering ? <Loading width={24} height={24} className="inline-block" /> : null}
          Pay
        </button>
      </form>

      <style jsx>{`
        .checkout-form :global(input:-webkit-autofill),
        .checkout-form :global(input:-webkit-autofill:hover),
        .checkout-form :global(input:-webkit-autofill:focus),
        .checkout-form :global(input:-webkit-autofill:active) {
          color: rgba(255, 255, 255, 0.96) !important;
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.13) inset !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
        }
      `}</style>
    </div>
  )
}

export default function Form ({ product, extra }) {
  const { productTypeDes, price, discount, name, currency } = product
  return (
    <div className="mx-auto rounded-lg pt-2 xl:max-w-[640px]">
      <h1 className="mb-2 text-[20px] font-bold text-white-95">Payment</h1>
      <div className="mt-3 flex items-center justify-between text-[14px] text-white-95">
        <span>
          {productTypeDes}&nbsp;•&nbsp;{name}
        </span>
        <span>
          {currency}
          {discount?.price ?? price}
        </span>
      </div>
      <div className="bg-black-12 -mx-4 my-4 h-[1px] xl:-mx-6 xl:mb-[18px]"></div>
      <CreditCardForm product={product} extra={extra} />
    </div>
  )
}
