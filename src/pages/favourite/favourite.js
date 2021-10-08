import Header from "../../components/header/headerComponent";
import Posts from "../../components/posts/postsComponent";
import Sidebar from "../../components/sidebar/sidebarComponent";
import "./favourite.css"

export default function Favourite(){
    return (
        <>
            <Header/>
            <div className="fav">
                <Posts/>
                <Sidebar/>
            </div>
        </>
    );
}