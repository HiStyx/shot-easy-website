import type { FormEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const Form = ({ children, className = '', onSubmit }: Props) => {
  return (
    <form
      className="relative mt-3 flex max-h-[960px] min-h-[520px] justify-center overflow-hidden"
      style={{ height: `calc(100vh - 80px)` }}
      onSubmit={onSubmit}
    >
      <div className={`flex-1 rounded-2xl bg-white p-2 ${className}`}>{children}</div>
    </form>
  )
}

export default Form
