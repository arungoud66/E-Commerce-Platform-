import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import CompleteWear from '../assets/CompleteWear.avif'
import Fellipe from '../assets/Fellipe.avif'
import Getty from '../assets/Getty.avif'
import JonLy from '../assets/JonLy.avif'
import KhaledMode from '../assets/KhaledMode.avif'
import OspanAli from '../assets/OspanAli.avif'
import SleeveLessWear from '../assets/SleeveLessWear.avif'
import SingleWear from '../assets/SingleWear.avif'
import Jacket from '../assets/Jacket.avif';
import denimJacket from '../assets/denimJacket.avif'
import trenchCoat from '../assets/trenchCoat.avif'
import woolCoat from '../assets/woolCoat.avif'
import sporty from '../assets/sporty.avif'
import blazer from '../assets/blazer.avif'
import puffer from '../assets/puffer.avif'
import longCoat from '../assets/longCoat.avif'

const CollectionPage = () => {
	const [products, setProducts] = useState([]);
	const sidebarRef = useRef(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleClickOutside = (e) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
			setIsSidebarOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Simulate product load with useEffect
	useEffect(() => {
		setTimeout(() => {
			const fetchedProducts = [
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
                {
                    _id: '9',
                    name: 'Classic Leather Jacket',
                    price: 150,
                    images: [
                        {
                            url: Jacket,
                            altText: 'Classic Leather Jacket',
                        },
                    ],
                },
                {
                    _id: '10',
                    name: 'Casual Denim Jacket',
                    price: 100,
                    images: [
                        {
                            url: denimJacket,
                            altText: 'Casual Denim Jacket',
                        },
                    ],
                },
                {
                    _id: '11',
                    name: 'Modern Trench Coat',
                    price: 180,
                    images: [
                        {
                            url: trenchCoat,
                            altText: 'Modern Trench Coat',
                        },
                    ],
                },
                {
                    _id: '12',
                    name: 'Sporty Windbreaker',
                    price: 90,
                    images: [
                        {
                            url: sporty,
                            altText: 'Sporty Windbreaker',
                        },
                    ],
                },
                {
                    _id: '13',
                    name: 'Chic Wool Coat',
                    price: 200,
                    images: [
                        {
                            url: woolCoat,
                            altText: 'Chic Wool Coat',
                        },
                    ],
                },
                {
                    _id: '14',
                    name: 'Stylish Blazer',
                    price: 130,
                    images: [
                        {
                            url: blazer,
                            altText: 'Stylish Blazer',
                        },
                    ],
                },
                {
                    _id: '15',
                    name: 'Minimalist Puffer Jacket',
                    price: 170,
                    images: [
                        {
                            url: puffer,
                            altText: 'Minimalist Puffer Jacket',
                        },
                    ],
                },
                {
                    _id: '16',
                    name: 'Elegant Long Coat',
                    price: 220,
                    images: [
                        {
                            url: longCoat,
                            altText: 'Elegant Long Coat',
                        },
                    ],
                },
            ];
			setProducts(fetchedProducts);
		}, 1000);
	}, []);
	return (
		<div className='flex flex-col lg:flex-row'>
			{/* Mobile Filter */}
			<button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
				<FaFilter className='mr-2' /> Filters
			</button>
			{/* Filter Sidebar */}
			<div
				ref={sidebarRef}
				className={`${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
				<FilterSidebar />
			</div>
			<div className='flex-grow p-4'>
				<h2 className='text-2xl uppercase mb-4'>All Collection</h2>
				{/* Sort Options */}
				<SortOptions />
				{/* Product Grid */}
				<ProductGrid products={products} />
			</div>
		</div>
	);
};
export default CollectionPage;
