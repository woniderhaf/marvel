import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServise from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';


const CharList = (props) => {

    const [data, setData] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} =  useMarvelServise()

    const onCharLoaded = (newdata) => {
        let ended = false;
        if(newdata.length < 9) {
            ended = true
        }

        setData(data => [...data, ...newdata])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }



    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ?  setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharLoaded)
    }
    const itemsRef = useRef([])
 

    const focusOnItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }

    const plug = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null;
    const context = data.map((item, i) => (
            <li 
                className="char__item" 
                key={item.id} 
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }} 
                onKeyDown={(e) => {
                    if (e.key === '' || e.key === 'Enter') {
                        props.onCharSelected(item.id);
                        focusOnItem(i) ;
                    }
                }}
                ref={el => itemsRef.current[i] = el}
                >
                <img src={item.thumbnail} alt={item.name} style={item.thumbnail === plug  ? {objectFit: 'contain'} : null}/>
                <div className="char__name">{item.name}</div>
            </li>
    ))

    return (
        <div className="char__list">
                {spinner}
            <ul className="char__grid">
                {context}
                {errorMessage}
            </ul>
            <button 
                className="button button__main button__long" 
                disabled={newItemLoading} 
                onClick={() => onRequest(offset)} 
                style={{display: charEnded ? 'none': 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func
}
export default CharList;