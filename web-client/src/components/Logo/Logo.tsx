import React from 'react'

type Props = {
  src: string
}

const Logo = (props: Props) => {
  return (
    <div className="h-16 w-full flex items-center px-8 mt-5 justify-center">
      <img src={props.src} alt="" width={144} height={30} />
    </div>
  )
}

export default Logo;