import React , {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pexels from './pages/Pexels';
import Pixabay from './pages/Pixabay';
import Unsplash from './pages/Unsplash';

function App() {

	const [query, setQuery] = useState('river');
	return (
		<>
			<Navbar searchQuery={(text) => setQuery(text)} />
			<Routes>
				<Route exact path="/unsplash" element={<Unsplash term={query}/>} />
				<Route exact path="/pixabay" element={<Pixabay term={query}/>} />
				<Route exact path="/pexels" element={<Pexels term={query}/>} />
			</Routes>
		</>
	);
}

export default App;
