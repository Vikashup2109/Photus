import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import ImageCardUnsplash from '../components/ImageCardUnsplash';

// const getRandomPage = () => Math.round(Math.random()*10);

const Unsplash = (props) => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [model, setModel] = useState(false);
	const [tempImg, setTempImg] = useState({});

	const baseURL = `https://api.unsplash.com/search/photos?page=2&query=${props.term}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`

	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.results);
				// console.log(images)
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [props.term]);

	const openModelPopUp = (TempImage) => {
		setTempImg(TempImage);
		setModel(true);

	}

	const saveFile = () => {
		saveAs(
			tempImg.urls.raw,
			"Unsplash_Image.jpg"
		);
	};

	return (
		<>
			{/* <Navbar searchQuery={(text) => setQuery(text)} /> */}
				{isLoading ? (
					<h1 className="text-6xl text-center mx-auto my-auto">Loading...</h1>
				) : (
						<div className="p-1 gallary">
							{images.map((image) => {
								return(
									<>
										<div key={image.id} onClick={() => openModelPopUp(image)}>
											<ImageCardUnsplash key={image.id}  image={image} />
										</div>
									</>
								)
							})}
						</div>
				)}

				{model && 
				<div className={model ? "model open" : "model"}>
				<i className='bx bx-x bx-md close-sign' onClick={() => setModel(false)}></i>
				<div className='flex px-5 py-5'>
					<div className='w-7/12'>
						<img src={tempImg.urls.raw} className="w-auto max-w-full h-auto max-h-full box-border rounded-md mx-auto my-auto"/>
					</div>
					<div className='flex flex-col px-5 py-5 text-2xl text-white text-left'>
						<div className='capitalize py-2'>
							<span>{tempImg.alt_description}</span>
						</div>
						<div className='flex space-x-6'>
							<div className='py-6 brightness-75'>
								<img src={tempImg.user.profile_image.large} alt="" className='rounded-full'/>
							</div>
							<div className='flex flex-col my-auto space-y-3'>
								
								<span className='text-xl hover:underline hover:text-green-800'>
									<a href={tempImg.user.portfolio_url} target="_blank">
										{tempImg.user.name}
									</a>
								</span>
								<span className='text-sm'>Photographer</span>
							</div>
						</div>
						<div className='pt-4'>
							<p className='text-base pt-8 leading-8 font-mono'>"This Photographer have {tempImg.user.total_photos} photos in his/her portfolio."<br/>
							<strong>Check it out <a href={tempImg.user.portfolio_url} className="hover:underline hover:text-green-800 cursor-pointer">HERE</a></strong></p>
						</div>
						<div className='space-x-20 my-auto flex'>
							<a href={tempImg.links.html} target="_blank">
								<button className='bg-white p-4 text-gray-800 rounded-lg'>See on UNSPLASH</button>
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

export default Unsplash;
