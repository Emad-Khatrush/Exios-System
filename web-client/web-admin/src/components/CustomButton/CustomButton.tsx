import React from 'react'

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './CustomButton.scss';

type Props = {
  size?: 'small' | 'medium' | 'large'
  color?: 'secondary' | 'success' | 'error'
  background?: string
  icon?: any
  style?: object
  onClick?: any
  children: any
  disabled?: boolean
  href?: string
  target?: string
  className?: string
}

const CustomButton = (props: Props) => {
  const { size, color, icon, background, href, style, onClick, disabled, target, className } = props;

  const customStyle: any = {
    textTransform: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Red Hat Text sans-serif',
    backgroundColor: background
  }

  const Type = href ? Link : React.Fragment;

  return (
    <Type target={target || '_self'} style={{ textDecoration: 'none'}} rel="noreferrer" to={href || ''}>
      <Button
        {...props}
        type="submit"
        variant="contained" 
        style={{ ...customStyle, ...style }} 
        color={color} 
        size={size} 
        startIcon={icon}
        onClick={onClick}
        disabled={disabled}
        className={`custom-button ${className}`}
      >
        {props.children} 
      </Button>
    </Type>
  )
}

export default CustomButton;