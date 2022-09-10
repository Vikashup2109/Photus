import { useEffect, useState } from "react";
import ImageCardPexels from "../components/ImageCardPexels";
import Navbar from "../components/Navbar";
import { saveAs } from 'file-saver';


const getRandomPage = () => Math.round(Math.random()*10);

const Pexels = () => {

	const [images, setImages] = useState([]);
	const [term, setTerm] = useState('river');
	const [isLoading, setIsLoading] = useState(true);
	const [model, setModel] = useState(false);
	const [tempImg, setTempImg] = useState({});

	const buildUrl= () => {
		let url = new URL('https://api.pexels.com/v1/search');

		url.search = new URLSearchParams({
			query: term,
			orientation: '',
			per_page: 20,
			page: getRandomPage()
		});
		return url;
	}
	useEffect(() => {
		fetch(buildUrl(), {
			headers: {
				Authorization: process.env.REACT_APP_PEXELS_API_KEY,
			},
		})
		.then(res => res.json())
		.then(data => {
			setImages(data.photos);
			setIsLoading(false);
		})
		.catch((err) => console.log(err));
	}, [term])

	const openModelPopUp = (TempImage) => {
		// console.log("Hello")
		setTempImg(TempImage);
		setModel(true);
	}

	const saveFile = () => {
		saveAs(
			tempImg.src.original,
			"Pexels_Image.jpg"
		);
	};

	return(
		<>
			<Navbar searchQuery={(text) => setTerm(text)} />
				{isLoading ? (
					<h1 className="text-6xl text-center mx-auto my-auto">Loading...</h1>
				) : (
						<div className="p-1 gallary">
							{images.map((image) => {
								return(
									<div key={image.id} onClick={() => openModelPopUp(image)}>
									<ImageCardPexels key={image.id} image={image} />
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
						<img src={tempImg.src.original} className="w-auto max-w-full h-auto max-h-full box-border rounded-md mx-auto my-auto"/>
					</div>
					<div className='flex flex-col px-5 py-5 text-2xl text-white text-left'>
						<div className='capitalize py-2'>
							<span>{tempImg.alt}</span>
						</div>
						<div className='flex space-x-6'>
							<div className='py-6 brightness-75'>
								<i class='bx bxs-user bx-lg' ></i>
							</div>
							<div className='flex flex-col my-auto space-y-3'>
								
								<span className='text-xl hover:underline hover:text-green-800'>
									<a href={tempImg.photographer_url} target="_blank">
										{tempImg.photographer}
									</a>
								</span>
								<span className='text-sm'>Photographer</span>
							</div>
						</div>
						<div className='pt-4'>
							<p className='text-base pt-8 leading-8 font-mono'>"This Photographer have many photos in his/her portfolio."<br/>
							<strong>Check it out <a href={tempImg.photographer_url} className="hover:underline hover:text-green-800 cursor-pointer">HERE</a></strong></p>
						</div>
						<div className='space-x-20 my-auto flex'>
							<a href={tempImg.url} target="_blank">
								<button className='bg-white p-4 text-gray-800 rounded-lg'>See on PEXELS</button>
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
	)
}
export default Pexels;