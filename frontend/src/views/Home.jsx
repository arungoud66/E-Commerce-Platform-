import React from 'react'
import Landing from '../components/Layout/Landing'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import CompleteWear from '../assets/CompleteWear.avif'
import Fellipe from '../assets/Fellipe.avif'
import Getty from '../assets/Getty.avif'
import JonLy from '../assets/JonLy.avif'
import KhaledMode from '../assets/KhaledMode.avif'
import OspanAli from '../assets/OspanAli.avif'
import SleeveLessWear from '../assets/SleeveLessWear.avif'
import SingleWear from '../assets/SingleWear.avif'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'


const placeHolderProducts = [
	{
		_id: 1,
		name: 'Formal Fusion',
		price: 120,
		images: [{ url: CompleteWear }],
	},
	{
		_id: 2,
		name: 'Urban Chill',
		price: 85,
		images: [{ url: Fellipe }],
	},
	{
		_id: 3,
		name: 'Street Luxe',
		price: 110,
		images: [{ url: Getty }],
	},
	{
		_id: 4,
		name: 'Denim Rebel',
		price: 95,
		images: [{ url: JonLy }],
	},
	{
		_id: 5,
		name: 'Monochrome Majesty',
		price: 130,
		images: [{ url: KhaledMode }],
	},
	{
		_id: 6,
		name: 'Cultural Blend',
		price: 100,
		images: [{ url: OspanAli }],
	},
	{
		_id: 7,
		name: 'Minimal Moves',
		price: 60,
		images: [{ url: SleeveLessWear }],
	},
	{
		_id: 8,
		name: 'Bold & Breezy',
		price: 70,
		images: [{ url: SingleWear }],
	},
];


const Home = () => {
  return (
    <div>
        <Landing />
        <GenderCollectionSection />
        <NewArrivals />

        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
			  <ProductDetails />
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
          <ProductGrid products={placeHolderProducts} />
			  </div>
        <FeaturedCollection />
        <FeaturesSection />
    </div>
  )
}

export default Home