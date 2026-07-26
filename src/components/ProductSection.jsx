import React from 'react'
import Product from './Product';
import Button from './Button';

const ProductSection = ({name="New Arrivals", data, border}) => {
  return (
    <div className={`flex py-10 ${border? "border-b border-secondary": ""} flex-1 flex-col space-y-6 mx-5 md:mx-10 xl:mx-15`}>
      <div className='w-full text-center font-extrabold text-3xl'>{name.toUpperCase()}</div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
        <Product img={"/images/fashion.png"} discount={30} rating={3}/>
        <Product img={"/images/furniture.png"} discount={20} rating={2.5}/>
        <Product img={"/images/electronics.png"} discount={10} rating={1}/>
        <Product img={"/images/groceries.png"} rating={4}/>
      </div>
      <Button colors={"border border-gray-300/50 mt-2 hover:bg-gray-300"} className={"justify-self-center px-15 py-2 w-full md:w-fit"}>View All</Button>
    </div>
  )
}

export default ProductSection;