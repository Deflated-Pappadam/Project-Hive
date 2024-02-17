import React, { useState } from 'react'

function FaqBox() {
    const [height, setheight] = useState(0)
  return (
    <div className='h-[100px] overflow-hidden bg-[#2e2f33] '></div>
  )
}

export default FaqBox