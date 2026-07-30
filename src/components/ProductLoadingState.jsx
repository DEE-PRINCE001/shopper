

const ProductLoadingState = () => {
  return (
    <div className={`flex py-10 flex-1 flex-col space-y-6 mx-5 md:mx-10 xl:mx-15`}>      
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
        <div className="bg-gray-300 rounded-2xl w-full h-40 animate-pulse"></div>
        <div className="bg-gray-300 rounded-2xl w-full h-40 animate-pulse"></div>
        <div className="bg-gray-300 rounded-2xl w-full h-40 animate-pulse"></div>
        <div className="bg-gray-300 rounded-2xl w-full h-40 animate-pulse"></div>
      </div>      
    </div>
  )
}

export default ProductLoadingState;