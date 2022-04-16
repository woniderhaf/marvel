import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';
import useMarvelServise from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '.././skeleton/Skeleton'
import { Link } from 'react-router-dom';

import './charInfo.scss';

const  CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} =  useMarvelServise();

    const onCharLoaded = (char) => {
        setChar(char)
    }
    const updateChar = () => {
        clearError()
        const {charId} = props
        if(!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const skeleton =  char || loading || error ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const context = !(loading || error || !char) ? <View char={char} comicsId={props.comicsId}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {context}
        </div>
    )
}

const View = ({char, comicsId}) => {
    const {name, description, thumbnail, homepage, wiki, items} = char
    const plug = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnail === plug  ? {objectFit: 'contain'} : null}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {items.length === 0 ? 'no comics' : null}
                    {items.map((item, i) => {
                        return (
                                <Link to={`/comics/${item.resourceURI.replace(/\D/g,'')}`} onClick={() => comicsId(`${item.resourceURI.replace(/\D/g,'')}`)} className="char__comics-item" key={i}>
                                    {item.name}

                                </Link>
                        )
                    }).slice(0,10)}

                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;