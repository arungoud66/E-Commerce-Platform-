import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Jacket from '../../assets/Jacket.avif';
import denimJacket from '../../assets/denimJacket.avif'
import trenchCoat from '../../assets/trenchCoat.avif'
import woolCoat from '../../assets/woolCoat.avif'
import sporty from '../../assets/sporty.avif'
import blazer from '../../assets/blazer.avif'
import puffer from '../../assets/puffer.avif'
import longCoat from '../../assets/longCoat.avif'


const NewArrivals = () => {
	const scrollRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(false);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const newArrivals = [
        {
            _id: '1',
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
            _id: '2',
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
            _id: '3',
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
            _id: '4',
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
            _id: '5',
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
            _id: '6',
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
            _id: '7',
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
            _id: '8',
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
    
	const handleMouseDown = (e) => {
		setIsDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = x - startX;
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};
	const handleMouseUpOrLeave = (e) => {
		setIsDragging(false);
	};

	const scroll = (direction) => {
		const scrollAmount = direction === 'left' ? -300 : 300;
		scrollRef.current.scrollBy({ left: scrollAmount, behaviour: 'smooth' });
	};
	// Update scroll buttons
	const updateScrollButtons = () => {
		const container = scrollRef.current;
		if (container) {
			const leftScroll = container.scrollLeft;
			const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
			setCanScrollLeft(leftScroll > 0);
			setCanScrollRight(rightScrollable);
		}
	};
	useEffect(() => {
		const container = scrollRef.current;
		if (container) {
			container.addEventListener('scroll', updateScrollButtons);
			updateScrollButtons();
			return () => container.removeEventListener('scroll', updateScrollButtons);
		}
	}, []);
	return (
		<section className='py-16 px-4'>
			<div className='container mx-auto text-center mb-10 relative'>
				<h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
				<p className='text-lg text-gray-600 mb-8'>
					Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of
					fashion.
				</p>
				{/* Scroll Button */}
				<div className='absolute right-0 bottom-[-30px] flex space-x-2'>
					<button
						onClick={() => scroll('left')}
						disabled={!canScrollLeft}
						className={`p-2 rounded border ${
							canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
						}`}>
						<FiChevronLeft className='text-2xl' />
					</button>
					<button
						onClick={() => scroll('right')}
						disabled={!canScrollRight}
						className={`p-2 rounded border ${
							canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
						}`}>
						<FiChevronRight className='text-2xl' />
					</button>
				</div>
			</div>
			{/* Scrollable Content */}
			<div
				ref={scrollRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUpOrLeave}
				onMouseLeave={handleMouseUpOrLeave}
				className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
					isDragging ? 'cursor-grabbing' : 'cursor-grab'
				}`}>
				{newArrivals.map((product) => (
					<div className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative' key={product._id}>
						<img
							className='w-full h-[500px] object-contain rounded-lg'
							src={product.images[0]?.url}
							alt={product.images[0]?.altText || product.name}
							draggable='false'
						/>
						<div className='absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
							<Link to={`/product/${product._id}`} className='block'>
								<h4 className='font-medium'>{product.name}</h4>
								<p className='mt-1'>${product.price}</p>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default NewArrivals;
