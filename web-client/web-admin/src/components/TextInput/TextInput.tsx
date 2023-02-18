import React from 'react'

import './TextInput.scss';

type Props = {
  id?: string
  placeholder: string
  className?: string
  type?: 'text' | 'password'
  onChange?: any
  icon: any
  name?: string
}

const SearchInput = ({ placeholder, icon, className, type, onChange, id, name }: Props) => {
  return (
    <div className={`d-flex`}>
      <div className={`search-icon`}>
        {icon}
      </div>
      <input
        name={name}
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
