import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

const Card = (props: Props) => {
  return (
    <div className={`h-fit w-auto rounded-md shadow-sm border bg-white p-5 ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card;
