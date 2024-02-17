import React from 'react';


type Props = {
    text:string;
    img:string;
  };

function DataBox(props:Props) {
  return (
    <div className='flex flex-col justify-center items-center md:w-[350px] md:h-[350px] bg-[#2e2f33]  rounded-xl p-5 m-2 shrink-0'>
        <img src= {props.img} className='w-[150px]'></img>
        <div className='text-white poppins-regular text-3xl text-center p-4'>
       {props.text}
        </div>
    </div>
  )
}

export default DataBox