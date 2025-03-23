import React from 'react'

const InputLabel = ({children}) => {
  return (
    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">
      {children}
    </label>
  )
}

export default InputLabel