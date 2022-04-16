import React, { useState } from "react";
import Helmet from "react-helmet";
import decoration from '../../resources/img/vision.png';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const MainPage = ({comicsId}) => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }
    return (
        <>
            <Helmet>
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">

                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                    
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} comicsId={comicsId}/>
                </ErrorBoundary>

            </div> 
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;