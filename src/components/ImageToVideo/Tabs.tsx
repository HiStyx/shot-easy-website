import React from 'react'

import { BizType } from './controllers/enums'

interface TabsProps {
  value: BizType
  onChange: (value: BizType) => void
}

const Tabs = ({ value, onChange }: TabsProps) => {
  const tabs = [
    {
      label: 'Image to Video',
      value: BizType.IMAGE_TO_VIDEO
    },
    {
      label: 'Text to Video',
      value: BizType.TEXT_TO_VIDEO
    }
  ]

  return (
    <div className="xl:h-18 flex h-12 w-full items-center gap-2 px-6">
      <ul className="flex flex-1 justify-center gap-2 xl:justify-start">
        {tabs.map((tab) => {
          const actived = value === tab.value
          const onClick = () => {
            !actived && onChange(tab.value)
          }
          return (
            <li key={tab.value}>
              <Tab actived={actived} onClick={onClick}>
                {tab.label}
              </Tab>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface TabProps {
  children: React.ReactNode
  actived: boolean
  onClick: () => void
}

const Tab = ({ children, actived, onClick }: TabProps) => {
  return (
    <div
      className={`h-8 rounded-xl px-3 text-sm font-medium leading-8  xl:h-10 xl:cursor-pointer xl:leading-10 ${
        actived ? 'bg-secondary text-white' : 'text-secondary'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Tabs
