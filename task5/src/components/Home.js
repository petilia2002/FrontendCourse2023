import Header from './Header';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import './home.css';

function Home() {
  return(
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <MovieList />
        <MovieDetails />
      </div>
    </div>
  );
}

export default Home;
