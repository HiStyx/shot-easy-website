import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { FlagSelect } from './Icons'
import { useDispatch, useStore } from './store'

const InputField = (
  {
    placeholder,
    name,
    alwayShowPlaceholder = true,
    type = 'text',
    validator = null,
    list = '',
    datalist = [],
    ...rest
  },
  ref
) => {
  const { form } = useStore()
  const [flag, setFlag] = useState('US')
  const [paddingLeft, setPaddingLeft] = useState(68)
  const prefixRef = useRef(null)
  const prefix = useRef('+1')
  const { value, errorMsg } = form[name] || {}
  const [, foreUpdate] = useState({})

  useEffect(() => {
    prefixRef.current?.clientWidth && setPaddingLeft(prefixRef.current?.clientWidth + 68)
  }, [prefixRef.current?.clientWidth])

  const dispatch = useDispatch()
  const onInput = useCallback(
    (e) => {
      dispatch({
        type: 'UPDATE_FORM',
        payload: {
          name,
          value: {
            value: e.target.value.trim(),
            errorMsg: validator?.(e.target.value) || ''
          }
        }
      })
    },
    [dispatch, name, validator]
  )
  const inputStyle = alwayShowPlaceholder && (value || name === 'phone_number') ? 'pt-[19px]' : ''
  const borderColor = errorMsg
    ? 'border-[#fc4041] focus:border-[#fc4041]'
    : 'border-black/40 focus:border-[#2679ff]'

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={name !== 'phone_number' && placeholder}
          style={
            name === 'phone_number'
              ? {
                  paddingLeft
                }
              : {}
          }
          className={`h-12 w-full rounded-2xl border bg-[rgba(255,255,255,0.13)] pl-3 text-[14px] leading-4 text-white-95 placeholder-gray-400 outline-0 focus:outline-0 xl:pl-4 ${inputStyle} ${borderColor}`}
          list={list}
          {...rest}
          onInput={onInput}
          ref={ref}
        />
        <style jsx>{`
          /* 移除Chrome浏览器自动填充时的背景色 */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            /* 使用透明背景色 */
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            /* 过渡效果，防止背景色闪烁 */
            transition: background-color 5000s ease-in-out 0s;
            /* 背景色设为透明 */
            background-color: transparent !important;
            /* 文本颜色设为黑色 */
            -webkit-text-fill-color: black !important;
            /* 移除拼写检查的红色波浪线 */
            -webkit-spell-check: none !important;
            -ms-spell-check: none !important;
            spell-check: none !important;
            /* 光标颜色设为黑色 */
            caret-color: black !important;
          }
        `}</style>
        {datalist && name === 'phone_number' ? (
          <>
            <div className="absolute left-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-1">
              <img
                alt={flag}
                src={require(`../../static/apg/Flags/${flag}.png`).default.src}
                className="h-6 w-6 rounded-md"
              />
              <FlagSelect />
              <div className="pt-[19px] text-[14px]" ref={prefixRef}>
                {prefix.current}
              </div>
              <select
                id="country-select"
                className="absolute inset-0 cursor-pointer border-none bg-transparent text-transparent outline-none"
                onChange={(e) => {
                  prefix.current = datalist.find(
                    (i) => i.regionCode === e.target.value.trim()
                  )?.callingCode
                  setFlag(e.target.value.trim())
                  dispatch({
                    type: 'UPDATE_FORM',
                    payload: {
                      name: 'prefix',
                      value: {
                        value: prefix.current,
                        errorMsg: ''
                      }
                    }
                  })
                  // 获取到正确的prefixRef.current?.clientWidth
                  Promise.resolve().then(() => foreUpdate({}))
                }}
              >
                {datalist.map((item, index) => (
                  <option
                    key={index}
                    value={item.regionCode}
                    label={item.regionName + ' ' + item.callingCode}
                    className="text-[#3c3d40]"
                  >
                    <img
                      alt=""
                      src={require(`../../static/apg/Flags/${item.regionCode}.png`).default.src}
                    />{' '}
                    {item.regionName} {item.callingCode}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <datalist id={list} className="bg-[#3c3d40]">
            {datalist.map((item, index) => (
              <option key={index} value={item} className="bg-[#3c3d40]">
                {item}
              </option>
            ))}
          </datalist>
        )}
      </div>

      {alwayShowPlaceholder && (value || name === 'phone_number') && (
        <span
          className={`${
            name === 'phone_number' ? 'left-16' : 'left-4'
          } absolute top-2 text-xs leading-[14px] text-white-48`}
        >
          {placeholder}
        </span>
      )}
      {errorMsg && (
        <div className="ml-[1px] mt-1 text-xs leading-[14px] text-[#fc4041]">{errorMsg}</div>
      )}
    </div>
  )
}

export default forwardRef(InputField)
