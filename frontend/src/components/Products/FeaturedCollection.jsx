import { Link } from 'react-router-dom';
import featured from '../../assets/featured.webp';
const FeaturedCollection = () => {
	return (
		<section className='py-16 px-4 lg:px-8'>
			<div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-xl'>
				{/* Left content */}
				<div className='lg:w-1/2 p-8 text-center lg:text-left'>
					<h2 className='text-lg font-semibold text-gray-700 mb-2'>Cozy Meets Cool</h2>
					<h2 className='text-4xl lg:text-5xl font-bold mb-6'>Made to match your everyday moments</h2>
					<p className='text-lg mb-6 text-gray-600'>
                        Experience premium comfort and style with clothing that seamlessly combines fashion and function—designed to help you look and feel your best every day.
					</p>
					<Link to='/collections/all' className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>
                        Find Your Fit
					</Link>
				</div>
				{/* Right Content */}
				<div className='lg:w-1/2'>
					<img
						className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
						src={featured}
						alt='Featured Collections'
					/>
				</div>
			</div>
		</section>
	);
};
export default FeaturedCollection;
