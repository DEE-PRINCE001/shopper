import React from 'react'
import Ratings from './Ratings'
import { CircleCheck } from 'lucide-react'

const Testimony = ({rating=5, name="Dummy T.", text}) => {
  return (
    <div className='flex flex-col p-5 space-y-1 w-full bg-white rounded-xl border border-gray-300/50'>
        <Ratings rating={rating} size={20}/>
        <div className='flex space-x-2 items-center pt-2'>
            <h3 className='text-primary font-medium text-[14px] leading-none'>{name}</h3>
            <CircleCheck className='fill-green-500 text-white -translate-y-0.5' size={18}/>
        </div>
        <div className='text-xs text-gray-500 pb-2 font-sans'>{text || "I'm blown away by the quality and style of the clothes I received from \
        Shopper. From casual wear to elegant dresses, every piece I've bought has \
        exceeded my expectations."}</div>


    </div>
  )
}

export default Testimony