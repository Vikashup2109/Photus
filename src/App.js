import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pexels from './pages/Pexels';
import Pixabay from './pages/Pixabay';
import Unsplash from './pages/Unsplash';
import All from './pages/All'

function App() {
	return (
		<>
			{/* <Navbar/> */}
			<Routes>
				<Route exact path="/" element={<All />} />
				<Route exact path="/unsplash" element={<Unsplash />} />
				<Route exact path="/pixabay" element={<Pixabay />} />
				<Route exact path="/pexels" element={<Pexels />} />
				{/* <Unsplash /> */}
			</Routes>
		</>
	);
}

export default App;
