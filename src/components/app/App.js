import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages";


const App = () => {
    const [comics, setComics] = useState(null)

    const comicsId = (id) => {
        setComics(id)
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes> 
                        <Route exact path="/" element={<MainPage comicsId={comicsId}/>} />
                        <Route exact path="/comics" element={<ComicsPage comicsId={comicsId}/>} />
                        {/* <Route path={`comics/${comics}`} element={ <SingleComicPage id={comics}/>}/> */}
                        <Route path="comics/:comicId" element={ <SingleComicPage id={comics}/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes> 
                </main>
            </div>  
        </Router>
    )
   
}

export default App;