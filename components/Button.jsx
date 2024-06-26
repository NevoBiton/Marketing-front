import React from 'react'

function Button({ children, onClick }) {
  return (
    <><button onClick={onClick} style={{ padding: "0.2rem 0.8rem", border: "none", cursor: "pointer", borderRadius: "5px" }}>{children}</button></>
  )
}

export default Button