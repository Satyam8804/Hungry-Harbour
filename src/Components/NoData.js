import React from 'react'

const NoData = ({data}) => {
  return (
    <div className='w-full flex items-center justify-center mt-16'><h3 style={{color:'gray'}}>Oops! {data} 🤒</h3></div>
  )
}

export default NoData