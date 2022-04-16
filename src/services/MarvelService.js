import {useHttp} from '../hooks/http.hook'

const useMarvelServise = () => {

    const {loading, request, error, clearError} = useHttp()


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=4c5f70cbfad632b47b204215788a4f1f';
    const _baseOffset = 210

    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await  request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);

    }   
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
        return _transformCharacter(res.data.results[0])
    }
    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComics)
    }

    const getComicsId = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apikey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.length < 190 ? char.description : char.description.slice(0, 190) + '...' : 'нет описания',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            items: char.comics.items
        }
    }

    const _transformComics =  (comic) => {
        return {
            id: comic.id,
            title: comic.series.name,
            description: comic.description ? comic.description.length < 190 ? comic.description : comic.description.slice(0, 190) + '...' : 'нет описания',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            prices: comic.prices[0].price || 'NOT AVAILABLE',
            pageCount: comic.pageCount || null,
            language:  comic.textObjects.language || 'en-us'
            
        }
        
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getComicsId}
}
export default useMarvelServise;