import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelServise from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";


import './Comics.scss'

const Comics = ({comicsId}) => {

    const {loading, getComics} = useMarvelServise()

    const [offset, setOffset] = useState(210)
    const [comics, setComics] = useState([])
    const [charEnded, setCharEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false)



    useEffect(() => {
        onRequest(offset, true); // запускается 1 раз после рендера страницы
    }, [])

    const onCharLoaded = (newComics) => {
        
        let ended = false;
        if(newComics.length < 8) {
            ended = true
        }
        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset + 9)
        setCharEnded(ended)
        setNewItemLoading(false)
    }
    const onRequest = (offset, initial) => { //запрос
        initial ?  setNewItemLoading(false) : setNewItemLoading(true)
        getComics(offset)
            .then(onCharLoaded)
    }
    const context = comics.map( item => (
        <div className="comics" key={item.id}>
            <Link to={`/comics/${item.id}`} onClick={() => comicsId(item.id)}>
                <img className="comics__img" src={item.thumbnail} alt="" />
                <p className="comics__title">{item.title}</p>
                <p className="comics__price">{`${item.prices}$`}</p>
            </Link>
        </div>
    ))
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <>
        {spinner}
        <div className="comics__list">
            {context}
            <button 
                className="button button__main button__long" 
                disabled={newItemLoading} 
                onClick={() => onRequest(offset)} 
                style={{display: charEnded ? 'none': 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
        </>
        
    )
}
export default Comics