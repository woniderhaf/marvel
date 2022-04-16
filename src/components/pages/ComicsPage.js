import Helmet from "react-helmet";
import Comics from "../comics/Comics";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = ({comicsId}) => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics">
                </meta>
                <title>Marvel comics</title>
            </Helmet>
            <AppBanner/>
            <Comics comicsId={comicsId}/>
        </>

    )
}

export default ComicsPage;