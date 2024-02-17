import React from 'react'
import Image from 'next/image'

type itemProps = {
    name:string
    Tokencost: string
    imageUrl: string
}

function MarketItem(props: itemProps) {
  return (
    <div className='w-[400px] h-full flex flex-col p-5 border-black-200 max-h-[400px] border-2  border-gray-500 rounded-3xl bg-white'>
        <Image src = {props.imageUrl} alt='' width={400} height={400} className='py-4 max-w-[230px] max-h-[250px] object-fill m-auto'/>
        <h1 className=' font-bold text-2xl'>{props.name}</h1>
        <p className='text-lg font-medium'>Cost:{props.Tokencost}</p>
    </div>
  )
}

export default MarketItem
