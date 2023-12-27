import './movie-card.css';
import copy from '../assets/ic-copy.svg';
import edit from '../assets/ic-edit.svg';
import arrow from '../assets/ic-arrow-right-huge.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, Link } from 'react-router-dom';



function MovieCard(){
    const favoriteURL = 'http://localhost:3000/favorites';
    const [isStar, setStar] = useState(false);
    const {movieId} = useParams();
    const [movie, setMovie] = useState({
        "id": 1,
        "title": "Beetlejuice",
        "year": "1988",
        "runtime": "92",
        "genres": [
          "Comedy",
          "Fantasy"
        ],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
      });

    async function getMovies(id){
        const URL = 'http://localhost:3000/movies';
        
    
        await axios.get(`${URL}?id=${id}`)
        .then(res => {
            console.log(res.data);
            setMovie(res.data[0]);
        });
    }

    function handleClickFav(){
        const star = document.querySelector('.favorite');
        if (!star.classList.contains('favorite_active')){
            console.log('blya')
            star.classList.add('favorite_active');
            axios.post(`${favoriteURL}`, movie).catch(err => {
                console.log(err.data);
            });
        }
        else{
            star.classList.remove('favorite_active');
            console.log(movie.id);
            axios.delete(`${favoriteURL}/${movie.id}`);
        }
    }
    const f = async() => {
        await axios.get(`${favoriteURL}?id=${movie.id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.length != 0){
                setStar(true)
            }
            else{
                setStar(false);
            }
        });
    }

    useEffect(() =>{
        getMovies(movieId);
        document.querySelector('.copy-img').addEventListener('click', () => {
            document.querySelector('.before').classList.add('before_active');

            let text = document.querySelector('.id').innerHTML;

            text = text.replace('Id: ', '');

            navigator.clipboard.writeText(text);

            setTimeout(() => {
                document.querySelector('.before').classList.remove('before_active');
            }, 1200);
        });
        console.log(isStar);
    }, [movieId]);

    useEffect(() =>{
        f();
    });

    return (
        <>
        <div className='card'>
            <header className='card__header'>
                <div className='movie-id'>
                    <p className='id'>Id: {movie.id}</p>
                    <div className='img-skin'>
                        <img className='copy-img' src={copy} alt='copy'/>
                        <div className='before'>copied</div>
                    </div>
                </div>

                <Link to={`/movie-details/edit/${movieId}`} className='edit-btn'>
                    <img className='edit-img' src={edit} alt=''/>
                    Редактировать
                </Link>
            </header>
            <div className='card__content'>
                <div className='content__main'>
                    <div className='poster'>
                        <img src={movie.posterUrl} alt='poster'/>
                    </div>
                    <div className='movie'>
                        <div className='movie__title'>{movie.title} <div className={`favorite ${isStar ? 'favorite_active':''}`} onClick={handleClickFav}></div></div>
                        <div className='movie__director'>{movie.director}</div>
                        <div className='movie__params'>
                            <div className='main-params'>
                                <p className='params__title'>Параметры</p>
                                <div className='params__field'>
                                    <p className='name'>Год производства</p>
                                    <p className='value'>{movie.year}</p>
                                </div>
                                <div className='params__field'>
                                    <p className='name'>Длительность</p>
                                    <p className='value'>{movie.runtime}</p>
                                </div>
                                <div className='params__field'>
                                    <p className='name'>Жанры</p>
                                    <p className='value'>{movie.genres.join(', ')}</p>
                                </div>
                            </div>
                            <div className='actors'>
                                <p className='actors__title'>В главных ролях <img src={arrow} alt=''/></p>
                                <p className='actor'>
                                    {movie.actors}
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content_desc'>
                    <p className='desc__title'>Описание</p>
                    <p className='desc__text'>{movie.plot}</p>
                </div>
            </div>
        </div>
        </>
    );
}


export default MovieCard;