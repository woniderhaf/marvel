import { useNavigate, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import useMarvelServise from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './SingleComicPage.scss'

const SingleComicPage = ({id}) => {

    const {getComicsId, error, loading} = useMarvelServise()


    const [comic, setComic] = useState(null)

    const onComicsLoaded = (comics) => {
        setComic(comics[0])
    }

    useEffect(() => {
        getComicsId(id)
            .then(onComicsLoaded)
    }, [id])

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <Error/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
        {spinner}
        {errorMessage}
        {content}
        </>
    )
}


const Error = () => {
    const navigate = useNavigate()
    return (
        <>
        <ErrorMessage/>
        <div onClick={() => navigate(-1)}  className="button button__main">
            <div className="inner">Come back</div>
        </div>
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, description, pageCount, prices, language} = comic
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics">
                </meta>
                <title>C{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{`${pageCount} pages`}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{`${prices}$`}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComicPage;