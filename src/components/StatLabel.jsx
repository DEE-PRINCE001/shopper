import React from 'react'

const StatLabel = ({value, title, className}) => {
    return (
        <div className={`flex flex-col items-center md:items-start ${className}`}>
            <h2 className='font-bold font-sans text-2xl'>{value || "200+"}</h2>
            <p className='font-light text-sm'> {title || "Products"} </p>

        </div>
    )
}

export default StatLabel