import './movie-list.css';
import Search from './Search';
import Footer from './Footer';
import Stack from './Stack';

import axios from 'axios';

import { useEffect, useState } from 'react';


function MovieList(){
    const [searchParam, setSearchParam] = useState('');
    const [countMovie, setCountMovie] = useState('0 элементов');

    function handleChange(){
        console.log('gbgb');
        setSearchParam(document.querySelector('.input-field').value);
        handleCountMovies();
    }

    async function handleCountMovies(){
        const URL = 'http://localhost:3000/movies';
        let count = 0;
        await axios.get(URL)
        .then(res => {
            const data = res.data;
            for(let i = 0; i < data.length; i++){
                if (data[i].title.includes(searchParam) || searchParam == '')
                    count++;
            };
        });
        
        if (count % 10 === 1){
            setCountMovie(`${count} элемент`);
        }
        if (count % 10 > 1 && count %10 < 5){
            setCountMovie(`${count} элемента`);
        }
        else{
            setCountMovie(`${count} элементов`);
        }
    }

    useEffect(() => {
        handleCountMovies();
    }, [searchParam, countMovie]);

    return (
        <>
        <div className='content-box'>
            <Search handler={handleChange}/>
            <Stack searchParam={searchParam}/>
            <Footer countMovie={countMovie}/>
        </div>
        </>
    );
}


export default MovieList;

