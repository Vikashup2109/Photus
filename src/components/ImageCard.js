import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import 'boxicons'


const ImageCard = (props) => {
	const saveFile = () => {
		saveAs(
			props.image.urls.raw,
			"Unsplash_Image.jpg"
		);
	};
	const controlEvent = (event) => {
		event.stopPropagation();
	};
	return (
	<>
		<div className='whole-box relative w-full cursor-pointer'>
		{/* <div className="column flex-[1_1_25%]"> */}
			<img className="image block w-full h-full py-2 " src={props.image.urls.raw} alt="" />
			<div className="onHoverOverlay absolute inset-0 h-full w-full opacity-0">
				<a href={props.image.user.portfolio_url} target='_blank' className='w-fit' onClick={controlEvent}>
					<div className="w-fit flex absolute top-6 px-4 space-x-2 text-center hover:opacity-80">
						<img src={props.image.user.profile_image.small} className="rounded-lg cursor-grab" alt='Protographer'/>
						<span className='text-white text-sm my-auto cursor-grab'>{props.image.user.name}</span>
					</div>
				</a>
				<div className='w-fit px-4 text-white absolute bottom-5 right-2' onClick={controlEvent}>
					<button className='hover:scale-110' onClick={saveFile}>
					<i className='bx bx-download bx-lg bx-fade-down-hover' ></i>
					</button>
				</div>
 			</div>

			{/* {props.image.user.links.html} for Photographer's profile link
			{props.image.user.name} for Photographer name
			{props.image.likes} for No. of Likes
			{props.image.user.portfolio_url} for Photographer Portfolio */}
		</div>

		
	</>
	);
};

export default ImageCard;
