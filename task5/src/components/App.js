import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import MovieCard from "./MovieCard";
import MovieEdit from "./MovieEdit";
import MovieAdd from "./MovieAdd";

export default function App(){
    return (
        <>
        <Routes>
            <Route path="/" element= {<Home />}>
                <Route path="/movie-details/:movieId" element={<MovieCard />}/>
                <Route path="/movie-details/edit/:id" element={<MovieEdit />} />
                <Route path="/movie-details/new" element={<MovieAdd />} />
            </Route>
        </Routes>
        </>
    );
}