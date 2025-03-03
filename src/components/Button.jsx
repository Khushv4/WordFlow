import React from 'react'

function Button({
  children,
  type='button',
  bgColor= 'bg-orange-400',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button className={`px-4 py-2 mt-2.5 mb-2.5 rounded-3xl hover:cursor-pointer ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button