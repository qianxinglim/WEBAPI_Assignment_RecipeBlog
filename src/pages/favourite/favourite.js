import FavHeader from "../../components/header/favHeaderComponent";
import Posts from "../../components/posts/postsComponent";
import Sidebar from "../../components/sidebar/sidebarComponent";
import "./favourite.css"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";

export default function Favourite(){
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const {user} = useContext(Context);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.post("http://localhost:5000/post/favourite",{
                userId: user._id,
            });

            //const res = await axios.post("http://localhost:5000/post/favourite");

            setPosts(res.data);
        };

        fetchPosts();
    },[]);

    return (
        <>
            <FavHeader/>
            <div className="home">
                <Posts posts={posts}/>
                <div className="sidebar sidebar-home">
                    <Sidebar/>
                </div>
            </div>
        </>
    );
}