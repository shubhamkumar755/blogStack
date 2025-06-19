import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) {
  return (
    //we are taking care of user who can pass his own designs
    <button className={`px-4 py-2 rounded-lg 
    ${bgColor} 
    ${textColor} 
    ${className}`}
    {...props}>
        {children}
    </button>
  )
}

export default Button
