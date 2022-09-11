import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleSearchQuery = (e) => {
		setSearchQuery(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		props.searchQuery(searchQuery);
	};
	return (
		<>
			<nav className="bg-gray-700 w-full h-[60px] flex">
				<div className='LogoSide self-center w-1/6 md:w-1/5'>
					<img src={Logo} alt="" className="p-1  h-10 w-[151px] md:h-12 md:w-[182px] mx-auto" />
				</div>
				<div className='w-1/2 md:w-2/5 xl:w-3/6 space-x-0 lg:space-x-4 font-sans font-bold text-white text-base lg:text-xl self-center text-center'>
							<Link to="/">
								<button className='bg-gray-700 hover:bg-white hover:text-gray-700 focus:text-gray-700 focus:bg-white rounded-lg px-2 py-1 md:px-3 md:py-2'>Unsplash</button>
							</Link>
							<Link to="/Pexels">
								<button className='bg-gray-700 hover:bg-white hover:text-gray-700 focus:text-gray-700 focus:bg-white rounded-lg px-2 py-1 md:px-3 md:py-2'>Pexels</button>
							</Link>
							<Link to="/Pixabay">
								<button className='bg-gray-700 hover:bg-white hover:text-gray-700 focus:text-gray-700 focus:bg-white rounded-lg px-2 py-1 md:px-3 md:py-2'>Pixabay</button>
							</Link>
				</div>
				<form className='SearchSide self-center space-x-2' onSubmit={onSubmit}>
						<input type="text" placeholder="Search.." className='p-2 rounded-lg w-36 md:w-48 lg:w-64 xl:w-80' onChange={handleSearchQuery}></input>
						<button className='bg-gray-700 text-base md:text-lg text-white md:p-2 rounded-lg'>Search</button>
				</form>
			</nav>
		</>
	);
};

export default Navbar;
