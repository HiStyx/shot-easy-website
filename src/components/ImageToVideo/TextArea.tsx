import React, { useRef } from 'react'

interface TextAreaProps {
  className?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  extral?: React.ReactNode
  maxLength?: number
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  value,
  onChange,
  placeholder,
  extral,
  maxLength
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const length = maxLength || 2000

  const onClear = (e) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div className={`border-input-border rounded-xl border px-3 py-4 ${className} relative`}>
      <textarea
        ref={textareaRef}
        className="textarea h-[calc(100%-24px)] w-full resize-none !border-none bg-transparent p-0 text-sm !outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={length}
      />
      <div
        className="absolute bottom-0 left-0 right-0 flex h-12 items-center px-3 xl:h-14 xl:px-4"
        onClick={() => {
          textareaRef.current?.focus()
        }}
      >
        <div className="flex-1">{extral}</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-secondary xl:text-sm">
            {value?.length ?? 0}/{length}
          </div>
          <div
            className="h-6 w-6 rounded-full bg-secondary/20 hover:bg-secondary/10 active:bg-secondary/30 xl:cursor-pointer"
            onClick={onClear}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M10 10L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 10L10 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextArea
