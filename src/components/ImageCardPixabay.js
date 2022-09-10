import React from 'react';
import { saveAs } from 'file-saver';


const ImageCardPixabay = (props) => {
	const user = `https://pixabay.com/users/${props.image.user}`;
	const tags = props.image.tags.split(',');
	const saveFile = () => {
		saveAs(
			props.image.webformatURL,
			"Pixabay_Image.jpg"
		);
	};

	const controlEvent = (event) => {
		event.stopPropagation();
	};
	return (
		<>
	<div className='whole-box relative w-full max-w-sm cursor-pointer'>
		{/* <div className="column flex-[1_1_25%]"> */}
			<img className="image block w-full h-full py-2 " src={props.image.webformatURL} alt="" />
			<div className="onHoverOverlay absolute inset-0 h-full w-full opacity-0">
				<a href={user} target='_blank' className='w-fit' onClick={controlEvent}>
					<div className="w-full flex absolute top-6 px-4 space-x-2 text-center hover:opacity-80">
						<img src={props.image.userImageURL} className="rounded-lg w-9 h-9 cursor-grab" alt=''/>
						<span className='text-white text-sm my-auto cursor-grab'>{props.image.user}</span>
					</div>
				</a>	
				<div className='w-fit px-4 text-white absolute bottom-5 right-2' onClick={controlEvent}>
					<button onClick={saveFile}>
						<i className='bx bx-download bx-lg bx-fade-down-hover' ></i>
					</button>
				</div>
 			 </div>
			{/* {props.image.user} for Photographer's profile link
			{props.image.views} for No. of Views
			{props.image.likes} for No. of Likes
			{props.image.downloads} for No. of Downloads */}
		</div>
		</>
	);
};

export default ImageCardPixabay;
