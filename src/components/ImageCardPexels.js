import React from 'react';
import { saveAs } from 'file-saver';


const ImageCardPexels= (props) => {
	const saveFile = () => {
		saveAs(
			props.image.src.original,
			"Pexels_Image.jpg"
		);
	};

	const controlEvent = (event) => {
		event.stopPropagation();
	};
	return (
	<>
	<div className='whole-box relative w-full cursor-pointer'>
		{/* <div className="column flex-[1_1_25%]"> */}
			<img className="image block w-full h-full py-2 " src={props.image.src.original} alt={props.image.alt} />
			<div className="onHoverOverlay absolute inset-0 h-full w-full opacity-0">
				<a href={props.image.photographer_url} target='_blank' className='w-fit' onClick={controlEvent}>	
					<div className="w-full flex absolute top-6 px-4 space-x-2 text-center text-white hover:opacity-80">
						<i className='bx bxs-user bx-md cursor-grab' ></i>
						<span className='text-sm my-auto cursor-grab'>{props.image.photographer}</span>
					</div>
				</a>
				<div className='w-fit px-4 text-white absolute bottom-5 right-2' onClick={controlEvent}>
					<button className='hover:scale-110' onClick={saveFile}>
					<i className='bx bx-download bx-lg bx-fade-down-hover' ></i>
					</button>
				</div>
 			 </div>
 			 </div>
			{/* {props.image.photographer_url} for Photographer's profile link
			{props.image.photographer} for Photographer name
			{props.image.likes} for No. of Likes
			{props.image.user.portfolio_url} for Photographer Portfolio */}
		
		</>
	);
};

export default ImageCardPexels;
