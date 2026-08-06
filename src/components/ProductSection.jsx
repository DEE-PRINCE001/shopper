import React, { useEffect, useState } from 'react'
import Product from './Product';
import Button from './Button';
import ProductLoadingState from './ProductLoadingState';
import { cartApi, catalogApi } from '../api';



const ProductSection = ({ name = "New Arrivals", data, border }) => {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {

      try {
        setLoading(true)
        const response = await catalogApi.getProducts();
        console.log(response.items)
        setProducts(response.items)

      }
      catch (err) {
        console.log(err)
        alert(err)
      }
      finally {
        setLoading(false)
      }


    }
    fetchProducts();
  }, [])


  if (loading) {
    return (
      <ProductLoadingState />
    )
  }

  return (
    <div className={`flex py-10 ${border ? "border-b border-secondary" : ""} flex-1 items-center flex-col space-y-6 mx-5 md:mx-10 xl:mx-15`}>
      <div className='w-full text-center font-archivo font-extrabold text-3xl'>{name.toUpperCase()}</div>
      <div className='grid w-full flex-1 grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
        {
          products.map((product) => {
            return (
              <Product img={"/images/electronics.png"} key={product.id} data={product} />)
          })
        }

        {/* <Product img={"/images/fashion.png"} discount={30} rating={3}/>
        <Product img={"/images/furniture.png"} discount={20} rating={2.5}/>
        <Product img={"/images/electronics.png"} discount={10} rating={1}/>
        <Product img={"/images/groceries.png"} rating={4}/> */}
      </div>
      <Button colors={"border border-gray-300/50 mt-2 hover:bg-gray-300"} className={"justify-self-center px-15 py-2 w-full md:w-fit"}>View All</Button>
    </div>
  )
}

export default ProductSection;