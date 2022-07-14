import React from 'react'

import './TextInput.scss';

type Props = {
  id?: string
  placeholder: string
  className?: string
  type?: 'text' | 'password'
  onChange?: any
  icon: any
}

const SearchInput = ({ placeholder, icon, className, type, onChange, id }: Props) => {
  return (
    <div className={`d-flex`}>
      <div className={`search-icon`}>
        {icon}
      </div>
      <input 
        id={id} 
        onChange={onChange} 
        className={`search-input ${className}`} 
        placeholder={placeholder} 
        type={type} 
      />
    </div>
  )
}
export default SearchInput;
