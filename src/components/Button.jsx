import React from 'react'

const Button = ({ children, leftIcon, rightIcon, size, colors, onClick, disabled, className, ...props }) => {
  return (

    <button onClick={onClick} disabled={disabled} className={`flex space-x-3 disabled:cursor-not-allowed enabled:cursor-pointer items-center justify-center enabled:border-2
        ${colors || "hover:bg-primary/10 text-primary"} ${className} rounded-full 
        ${size || "py-2.5 px-3.5 fit text-sm"}`} {...props} >
      {leftIcon ? leftIcon : ""}
      <p>{children || "Newest"}</p>
      {rightIcon ? rightIcon : ''
        // <div className='w-0 h-0 border-l-8 border-r-8 border-t-10 
        // border-l-transparent border-r-transparent border-t-primary'></div>
      }
    </button>

  )
}

export default Button