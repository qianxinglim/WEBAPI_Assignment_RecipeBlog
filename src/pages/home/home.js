import { Component, useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../components/header/headerComponent";
import Posts from "../../components/posts/postsComponent";
import Sidebar from "../../components/sidebar/sidebarComponent";
import "./home.css"
import { useLocation } from "react-router";
import { Context } from "../../context/Context";

export default function Home (){
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const {user} = useContext(Context);
    const [error, setError] = useState("");

    useEffect(() => {
        // setError(false);

        const fetchPosts = async () => {
            const res = await axios.get("https://recipeblog-qx.herokuapp.com/post" + search);

            // const res = await axios.post("http://localhost:5000/post",{
            //     userId: user._id,
            // });

            // if(res.data != null){
            //     if (isEmptyObject(res.data)) {
            //         setError(true);
            //         console.error("No result");
            //     } else {
            //         setError(false);
                    setPosts(res.data);
            //     }
            // }else{
            //     setError(true);
            // }

            

            // let firstResult = await axios.get("http://localhost:5000/post" + search);

            // let updatedResult = firstResult.data.map(async item => {
            //     const fav = {
            //         userId: user._id,
            //         recipeId: item.idMeal
            //     }

            //     let post = await axios.post("http://localhost:5000/post/check", fav);

            //     item.favourited = post;
            //     return item;
            // });

            // Promise.all(updatedResult).then(finalResult => setPosts(finalResult));
        };

        fetchPosts();
    },[search]);

    function isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }

    // constructor(props) {
    //     super(props);
    
    //     this.state ={
    //         id: '',
    //         title: '',
    //         image: '',
    //         category: ''
    //     }
    //     //this.state = {exercises: []};
    // }

    // componentDidMount() {
    //     axios.get('https://themealdb.com/api/json/v1/1/search.php?s=chicken').then(response => {
    //         if (response.data.length > 0) {
    //             this.setState({
    //               id: response.data.results[0].idMeal,
    //               title: response.data.results[0].strMeal,
    //               image: response.data.results[0].strMealThumb,
    //               category: response.data.results[0].strCategory
    //             })
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    // onChangeSearch(e) {
    //     this.setState({
    //         title: e.target.value,
    //         category:  e.target.value
    //     })
    // }
    
    
    // onSearch(e){
    //     e.preventDefault();

    //     const post = {
    //         id: this.state.id,
    //         title: this.state.title,
    //         image: this.state.image,
    //         category: this.state.category
    //     };

    //     console.log(post);

    //     axios.post('http://localhost:5000/post/search', post)
    //         .then(res => console.log(res.data));

    //     this.setState({
    //         username:''
    //     })

    //     //Once submit the form, will redirect user to main page
    //     //window.location = '/';
    // }


    //render(){
        return (
            <>
                <Header/>
                <div className="home">
                {posts ? (<Posts posts={posts}/>) : (<p className="pclass">No Recipe found.</p>)}
                {/* {!error ? (<Posts posts={posts}/>) : (<p className="pclass">No Recipe found.</p>)} */}
                {/* {error && (<p className="pclass">No Recipe found.</p>)} */}
                    <div className="sidebar sidebar-home">
                        <Sidebar/>
                    </div>
                </div>
            </>
        );
    //}
}