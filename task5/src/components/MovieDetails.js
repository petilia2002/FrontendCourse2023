import { Outlet } from 'react-router-dom';
import './movie-details.css';


function MovieDetails(){
    //const {movie} = useLoaderData();
   //console.log(movie);
    return (
        <>
        <div className='movie-details'>
            <Outlet />
        </div>
        </>
    );
}

export default MovieDetails;