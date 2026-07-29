import React from 'react'

const LoadingState = () => {
    return (
        <div className="bg-white rounded-xl h-40 p-4 w-full flex justify-center items-center ">
            <div className="bg-gray-400 flex-1 h-full text-2xl font-bold text-center rounded-xl animate-pulse flex items-center justify-center">Loading...</div>
        </div>
    )
}

export default LoadingState