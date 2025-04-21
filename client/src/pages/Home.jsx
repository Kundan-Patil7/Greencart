import React from 'react'
import {BestSeller, BottomBanner, Categories, MainBanner,NewLetter} from '../components/Home/index'

const Home = () => {
  return (
    <div className = 'mt-8' >
        <MainBanner/>
        <Categories />
        <BestSeller/>
        <BottomBanner/>
        <NewLetter/>
    </div>
  )
}

export default Home