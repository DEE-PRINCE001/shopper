import { StarHalf } from 'lucide-react'
import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Ratings = ({ rating, size = 15 }) => {
    return (
        <div className='flex items-center space-x-1'>
            {
                [1, 2, 3, 4, 5].map((star) => {
                    if (rating >= star){
                        return (
                            <FaStar key={star} size={size} className='fill-yellow-400'/>
                        )
                        
                    }
                    
                    if (rating >= star - 0.5){
                        return ( 
                        <FaStarHalfAlt key={star} size={size} className='fill-yellow-400'/>
                        );
                    }
                    
                    return ( 
                    <FaRegStar key={star} size={size} className='fill-yellow-400'/>
                    );
        })
            }
        </div>
    )
}

export default Ratings