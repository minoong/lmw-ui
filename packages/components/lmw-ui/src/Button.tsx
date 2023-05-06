/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import '../styles/button.css'
import { css } from '@emotion/css'

const color = 'white'

export interface ButtonProps {
 /**
  * Is this the principal call to action on the page?
  */
 primary?: boolean
 /**
  * What background color to use
  */
 backgroundColor?: string
 /**
  * How large should the button be?
  */
 size?: 'small' | 'medium' | 'large'
 /**
  * Button contents
  */
 label: string
 /**
  * Optional click handler
  */
 onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
 primary = false,
 size = 'medium',
 backgroundColor,
 label,
 ...props
}: ButtonProps) => {
 const mode = primary
  ? 'storybook-button--primary'
  : 'storybook-button--secondary'
 return (
  <button
   //    className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
   className={css`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
     color: ${color};
    }
   `}
   style={{ backgroundColor }}
   {...props}
  >
   {label}
  </button>
 )
}
