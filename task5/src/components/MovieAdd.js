import { Link, useParams } from 'react-router-dom';
import './movie-edit.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MovieAdd(){
    const [movie, setMovie] = useState({
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


    async function handleClick(){
        
        const URL = 'http://localhost:3000/movies';

        const genres = document.querySelector('#genres').value.split(', ');


        setMovie({
            "title": document.querySelector('#title').value,
            "year": document.querySelector('#year').value,
            "runtime": document.querySelector('#runtime').value,
            "genres": genres,
            "director": document.querySelector('#director').value,
            "actors": document.querySelector('#actors').value,
            "plot": document.querySelector('#plot').value,
            "posterUrl": document.querySelector('#posterUrl').value
        }
        );

        console.log(movie);

        await axios.post(`${URL}`, movie);

        window.location.reload();
    }

    function handleChange(e){
        const genres = document.querySelector('#genres').value.split(', ');
        setMovie({
            "title": document.querySelector('#title').value,
            "year": document.querySelector('#year').value,
            "runtime": document.querySelector('#runtime').value,
            "genres": genres,
            "director": document.querySelector('#director').value,
            "actors": document.querySelector('#actors').value,
            "plot": document.querySelector('#plot').value,
            "posterUrl": document.querySelector('#posterUrl').value
        }
        );
    }

    useEffect(() =>{

    }, []);

    return (
        <>
        <div className="edit-wrapper">
            <div>
                <header className="edit-header">
                    Редактирование / Создание
                </header>
                <main className="edit-main">
                    <div className='param'>
                        <p className='param__title'>Название фильма</p>
                        <input className='param__field' type='text' placeholder='Введите название фильма' id='title' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Год выпуска</p>
                        <input className='param__field' type='text' placeholder='Введите год выпуска' id='year' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Длительность</p>
                        <input className='param__field' type='text' placeholder='Укажите Длительность' id='runtime' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Жанры</p>
                        <input className='param__field' type='text' placeholder='Укажите жанры (через ,)' id='genres' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Описание</p>
                        <input className='param__field' type='text' placeholder='Введите ...' id='plot' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Укажите ссылку на обложку</p>
                        <input className='param__field' type='text' placeholder='Введите ...' id='posterUrl' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Укажите список актеров</p>
                        <input className='param__field' type='text' placeholder='Введите актеров (через ,)' id='actors' onChange={handleChange}/>
                    </div>
                    <div className='param'>
                        <p className='param__title'>Режиссер</p>
                        <input className='param__field' type='text' placeholder='Введите ...' id='director' onChange={handleChange}/>
                    </div>
                </main>
            </div>
            <footer className="edit-footer">
                <Link to={`/`} className='find-btn'>Отменить</Link>
                <Link onClick={handleClick} to={`/`} className='add-btn'>Сохранить</Link>
            </footer>
        </div>
        </>
    );
}