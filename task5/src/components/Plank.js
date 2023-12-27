import './plank.css';



function Plank(props){
    
    return (
        <>
        <div className='plank'>
            <div className='plank__title'>{props.title}</div>
            <div className='plank__description'>
                <p className='year'>{props.year}</p>
                <p className='genres'>{props.genres}</p>
            </div>
        </div>
        </>
    );
}

export default Plank;