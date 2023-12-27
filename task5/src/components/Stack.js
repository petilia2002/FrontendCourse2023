import './stack.css';
import Plank from './Plank';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:3000/movies';
function Stack(props){
    const [planks, setPlanks] = useState([]);
    async function loadMovies(){
        
        let data = []
        await axios.get(URL)
        .then(res => {
            data = res.data;
            const temp = []
            console.log(props.searchParam);
            for(let i = 0; i < data.length; i++){
                if (data[i].title.includes(props.searchParam) || props.searchParam == '')
                    temp.push(<Link to={`movie-details/${data[i].id}`}><Plank title={data[i].title} year={data[i].year} genres={data[i].genres.join(', ')} /></Link>)
            };
    
            setPlanks(temp);
            document.querySelectorAll('.plank').forEach(elem => {
                elem.addEventListener('click', () =>{
                    if (document.querySelector('.plank_active') != null){
                        document.querySelector('.plank_active').classList.remove('plank_active');
                    }
                    elem.classList.toggle('plank_active');
                })
            })
        })
        .catch(err => {
            console.log(err.data);
        });    
    }

    useEffect(() => {
        loadMovies();
        
    }, [props]);
    
    return (
        <>
        <div className='stack'>
            {planks}  
        </div>
        </>
    );
}

export default Stack;