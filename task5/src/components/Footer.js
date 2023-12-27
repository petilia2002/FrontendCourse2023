import { Link } from 'react-router-dom';
import './footer.css';
import { useState, useEffect } from 'react';

function Footer(props){

    const [countPlanks, setCountPlanks] = useState(props.countMovie);

    useEffect(() => {
        setCountPlanks(props.countMovie);
    }, [props]);

    return (
        <>
        <footer className='footer'>
                <div className='find-info'>
                    Найдено {countPlanks}
                </div>
                <Link to={`/movie-details/new`}><button className='add-btn'><span>+</span>Добавить</button></Link>
        </footer>
        </>
    );
}

export default Footer;