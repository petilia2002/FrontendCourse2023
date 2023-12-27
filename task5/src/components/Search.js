import './search.css';


function Search(props){
    return (
        <>
        <div className='search'>
            <input className='input-field' type='text' placeholder='Введите название фильма' />
            <button className='find-btn'onClick={props.handler}>Искать</button>
        </div>
        </>
    );
}

export default Search;