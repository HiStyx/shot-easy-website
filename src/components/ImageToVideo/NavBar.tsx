import React from 'react'

interface NavBarProps {
  className?: string
  rightContent?: React.ReactNode
  leftContent?: React.ReactNode
  children?: React.ReactNode
}

const NavBar = ({ className, rightContent, leftContent, children }: NavBarProps) => {
  return (
    <div className={`xl:h-18 flex h-12 w-full items-center gap-2 px-4 ${className}`}>
      {leftContent}
      <div className="flex-1">{children}</div>
      {rightContent}
    </div>
  )
}

export default NavBar
