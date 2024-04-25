import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: React.ReactNode | React.ReactNode[]
    className?: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    tooltip?: string
    style?: React.CSSProperties
    ref?: React.RefObject<HTMLButtonElement>
    id?: string
    hidden?: boolean
    disabled?: boolean
    draggable?: boolean

    design?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'disabled'
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
    shape?: 'squared' | 'rounded' | 'pill' | 'default'
    variant?: 'normal' | 'outline' | 'ghost' | 'text'
}

export default function Button({ children, className = '', type = 'button', onClick, tooltip, style, ref, id, hidden, disabled, draggable, design = 'primary', size = 'medium', variant = 'normal', shape = 'default', ...props }: ButtonProps): React.ReactElement {
    return (
        <button
            className={`button-component ${className} ${design} ${size} ${variant} ${shape}`}
            type={type}
            onClick={onClick}
            title={tooltip}
            style={style}
            ref={ref}
            id={id}
            hidden={hidden}
            disabled={disabled}
            draggable={draggable}
            aria-label={tooltip}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}