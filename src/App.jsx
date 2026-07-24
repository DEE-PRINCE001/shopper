import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Ratings from './components/Ratings'

const App = () => {
  return (

    <BrowserRouter>
      <div className='font-lupio font-bold'>App</div>
      <Ratings rating={3}/>
    </BrowserRouter>
  )
}

export default App