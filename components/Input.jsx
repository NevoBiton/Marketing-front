import React from 'react';
import "../styles/components.style.css/input.css"
import { forwardRef } from 'react';

const InputComponent = forwardRef(({ checked, type, placeholder, value, onChange, name, id, className, required }, ref) => {

    const defaultClass = 'input-component';

    return (
        <input
            className={`${defaultClass} ${className}`}
            checked={checked}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            ref={ref}
            id={id}
            required={required}
        />
    );
});

export default InputComponent;
