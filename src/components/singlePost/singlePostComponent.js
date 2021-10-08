import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./singlePostComponent.css"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})

  useEffect(() => {
    const getPost = async () =>{
      const res = await axios.get("http://localhost:5000/post/" + path);
      //const res = await axios.get("https://themealdb.com/api/json/v1/1/search.php?s=chicken");
      setPost(res.data);
      console.log(res.data);
    };

    getPost()
  },[path]);

    return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.strMealThumb && (
            <img src={post.strMealThumb} alt="" className="singlePostImg"/>
          )}
            <h1 className="singlePostTitle">{post.strMeal}</h1>

            <div className="singlePostInfo">
                <span className="singlePostDate">{post.strArea} Cuisine</span>
                <span className="singlePostAuthor">Category: <b>{post.strCategory}</b></span>
            </div>

            <p className="singlePostDesc">
              {post.strInstructions}
            </p>

            <hr/>

            <p className="singlePostInTitle">Ingredients</p>

            {post.strIngredient1 && (
              <p className="singlePostIn">
                {post.strIngredient1} - {post.strMeasure1}
              </p>
            )}

            {post.strIngredient2 && (
            <p className="singlePostIn">
              {post.strIngredient2} - {post.strMeasure2}
            </p>
            )}

            {post.strIngredient3 && (
            <p className="singlePostIn">
              {post.strIngredient3} - {post.strMeasure3}
            </p>
            )}

            {post.strIngredient4 && (
            <p className="singlePostIn">
              {post.strIngredient4} - {post.strMeasure4}
            </p>
            )}

            {post.strIngredient5 && (
            <p className="singlePostIn">
              {post.strIngredient5} - {post.strMeasure5}
            </p>
            )}

            {post.strIngredient6 && (
            <p className="singlePostIn">
              {post.strIngredient6} - {post.strMeasure6}
            </p>
            )}

            {post.strIngredient7 && (
            <p className="singlePostIn">
              {post.strIngredient7} - {post.strMeasure7}
            </p>
            )}

            {post.strIngredient8 && (
            <p className="singlePostIn">
              {post.strIngredient8} - {post.strMeasure8}
            </p>
            )}

            {post.strIngredient9 && (
            <p className="singlePostIn">
              {post.strIngredient9} - {post.strMeasure9}
            </p>
            )}

            {post.strIngredient10 && (
            <p className="singlePostIn">
              {post.strIngredient10} - {post.strMeasure10}
            </p>
            )}

            {post.strIngredient11 && (
            <p className="singlePostIn">
              {post.strIngredient11} - {post.strMeasure11}
            </p>
            )}

            {post.strIngredient12 && (
            <p className="singlePostIn">
              {post.strIngredient12} - {post.strMeasure12}
            </p>
            )}

            {post.strIngredient13 && (
            <p className="singlePostIn">
              {post.strIngredient13} - {post.strMeasure13}
            </p>
            )}

            {post.strIngredient14 && (
            <p className="singlePostIn">
              {post.strIngredient14} - {post.strMeasure14}
            </p>
            )}

            {post.strIngredient15 && (
            <p className="singlePostIn">
              {post.strIngredient15} - {post.strMeasure15}
            </p>
            )}

            {post.strIngredient16 && (
            <p className="singlePostIn">
              {post.strIngredient16} - {post.strMeasure16}
            </p>
            )}

            {post.strIngredient17 && (
            <p className="singlePostIn">
              {post.strIngredient17} - {post.strMeasure17}
            </p>
            )}

            {post.strIngredient18 && (
            <p className="singlePostIn">
              {post.strIngredient18} - {post.strMeasure18}
            </p>
            )}

            {post.strIngredient19 && (
            <p className="singlePostIn">
              {post.strIngredient19} - {post.strMeasure19}
            </p>
            )}

            {post.strIngredient20 && (
            <p className="singlePostIn">
              {post.strIngredient20} - {post.strMeasure20}
            </p>
            )}


              {/* <br/>
              {post.strIngredient3} - {post.strMeasure3}
              <br/>
              {post.strIngredient4} - {post.strMeasure4}
              <br/>
              {post.strIngredient5} - {post.strMeasure5}
              <br/>
              {post.strIngredient6} - {post.strMeasure6}
              <br/>
              {post.strIngredient7} - {post.strMeasure7}
              <br/>
              {post.strIngredient8} - {post.strMeasure8}
              <br/>
              {post.strIngredient9} - {post.strMeasure9}
              <br/>
              {post.strIngredient10} - {post.strMeasure10}
              <br/>
              {post.strIngredient11} - {post.strMeasure11}
              <br/>
              {post.strIngredient12} - {post.strMeasure12}
              <br/>
              {post.strIngredient13} - {post.strMeasure13}
              <br/>
              {post.strIngredient14} - {post.strMeasure14}
              <br/>
              {post.strIngredient15} - {post.strMeasure15}
              <br/>
              {post.strIngredient16} - {post.strMeasure16}
              <br/>
              {post.strIngredient17} - {post.strMeasure17}
              <br/>
              {post.strIngredient18} - {post.strMeasure18}
              <br/>
              {post.strIngredient19} - {post.strMeasure19}
              <br/>
              {post.strIngredient20} - {post.strMeasure20}
              <br/> */}

        </div>
      </div>
    );
}