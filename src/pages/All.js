import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const getRandomPage = () => Math.round(Math.random()*10);

const All = () => {
    const [allImages, setAllImages] = useState([]);
    const [term, setTerm] = useState('cat')
    // const [isLoading, setIsLoading] = useState(true);
    // const [model, setModel] = useState(false);
    // const [tempImg, setTempImg] = useState({});

    const UnsplashBaseUrl = `https://api.unsplash.com/search/photos?page=2&query=${term}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
	const PixabayBaseURL = `https://pixabay.com/api/?key=29413394-debf50fddeaeb13c144632614&q=${term}&image_type=photo&pretty=true`
    
    const PexelsBaseUrl= () => {
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
        Promise.all([
            fetch(UnsplashBaseUrl).then((res1) => res1.json()),
            fetch(PixabayBaseURL).then(res2 => res2.json()),
            fetch(PexelsBaseUrl(), {
                    headers: {
                        Authorization: process.env.REACT_APP_PEXELS_API_KEY,
                    },
                }).then(res3 => res3.json())
        ])
            .then(([UnsplashData, PixabayData, PexelsData]) => {
                const Data1 = UnsplashData.results;
                const Data2 = PixabayData.hits;
                const Data3 = PexelsData.photos
                setAllImages([ ...Data1, ...Data2, ...Data3]);
                console.log(allImages);
            })
            .catch((err) => console.log(err));
    }, [term])
    
    return (
        <>
            <Navbar searchQuery={(text) => setTerm(text)} />
        </>
    )
}

export default All;