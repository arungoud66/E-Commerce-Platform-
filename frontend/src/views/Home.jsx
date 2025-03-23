import React from 'react'
import Landing from '../components/Layout/Landing'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'

const Home = () => {
  return (
    <div>
        <Landing />
        <GenderCollectionSection />
        <NewArrivals />

        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
			  <ProductDetails />
    </div>
  )
}

export default Home