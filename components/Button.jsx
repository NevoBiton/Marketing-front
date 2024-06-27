import React from 'react'
import "../styles/components.style.css/button.css"

function Button({ children, onClick, className }) {
  const defaultClass = 'button-component';
  return (
    <><button
      onClick={onClick}
      className={`${defaultClass} ${className}`}
    >
      {children}
    </button></>
  )
}

export default Button