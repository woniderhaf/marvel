import React, { useState, useEffect } from 'react';
import './randomChar.scss';
import useMarvelServise from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import View from './View'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    const [char, setChar] = useState({})

    const {loading, error, getCharacter, clearError} =  useMarvelServise();

    const onCharLoaded = (char) => {
        setChar(char)
    }



    useEffect(() => {
        updateChar();
    }, [])

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
    }
    const tryIt = () => {
        updateChar()
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={tryIt} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}



export default RandomChar;