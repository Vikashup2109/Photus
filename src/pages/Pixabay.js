import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import ImageCardPixabay from '../components/ImageCardPixabay';
import Navbar from '../components/Navbar';

const Pixabay = () => {
	const [images, setImages] = useState([]);
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [model, setModel] = useState(false);
	const [tempImg, setTempImg] = useState({});

	
	const baseURL = `https://pixabay.com/api/?key=29413394-debf50fddeaeb13c144632614&q=${query}&image_type=photo&pretty=true`
	
	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [query]);

	const openModelPopUp = (TempImage) => {
		// console.log("Hello")
		setTempImg(TempImage);
		setModel(true);
	}

	const saveFile = () => {
		console.log("Hello")
		saveAs(
			tempImg.webformatURL,
			"Pixabay_Image.jpg"
		);
	};

	const user = `https://pixabay.com/users/${tempImg.user}`;

	return (
		<>
			<Navbar searchQuery={(text) => setQuery(text)} />
				{isLoading ? (
					<h1 className="text-6xl text-center mx-auto my-auto">Loading...</h1>
				) : (
						<div className="p-1 gallary">
							{images.map((image) => {
								return(
									<div key={image.id} onClick={() => openModelPopUp(image)}>
									<ImageCardPixabay key={image.id} image={image} />
								</div>
								)
							})}
						</div>
				)}

			{model && 
				<div className={model ? "model open" : "model"}>
					<i className='bx bx-x bx-md close-sign' onClick={() => setModel(false)}></i>
					<div className='flex px-5 py-5'>
						<div className='w-7/12'>
							<img src={tempImg.webformatURL} className="w-auto max-w-full h-auto max-h-full box-border rounded-md mx-auto my-auto"/>
						</div>
						<div className='flex flex-col px-5 py-5 text-2xl text-white text-left'>
							<div className='capitalize py-2'>
								<span>Awesome Photos by Pixabay.</span>
							</div>
							<div className='flex space-x-6'>
								<div className='py-6 brightness-75'>
								<img src={tempImg.userImageURL} alt="" className='rounded-full w-32'/>
								</div>
								<div className='flex flex-col my-auto space-y-3'>

									<span className='text-xl hover:underline hover:text-green-800'>
										<a href={user} target="_blank">
											{tempImg.user}
										</a>
									</span>
									<span className='text-sm'>Photographer</span>
								</div>
							</div>
							<div className='pt-4'>
								<p className='text-base pt-8 leading-8 font-mono'>"This Photographer have many photos in his/her portfolio."<br/>
								<strong>Check it out <a href={user} className="hover:underline hover:text-green-800 cursor-pointer">HERE</a></strong></p>
							</div>
							<div className='space-x-20 my-auto flex'>
								<a href={tempImg.pageURL} target="_blank">
									<button className='bg-white p-4 text-gray-800 rounded-lg'>See on PIXABAY</button>
								</a>
								<button className='bg-green-800 p-4 text-white rounded-lg space-x-1' onClick={saveFile}>
									<span>DOWNLOAD</span>
								</button>
							</div>
						</div>
					</div>
				</div>	
			}

		</>
	);
};

export default Pixabay;
