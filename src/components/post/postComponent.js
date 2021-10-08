import "./postComponent.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  //const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
        <img className="postImg" src={post.strMealThumb} alt=""/>

        <div className="postInfo">
          {/* <span className="postCat">{post.strArea}</span> */}

            {/* <div className="postCats">
                <span className="postCat">Music</span>
                <span className="postCat">Life</span>
            </div> */}

            <Link to={`/post/${post.idMeal}`} className="link">
              <span className="postTitle">{post.strMeal}</span>
            </Link>
            {/* <hr/> */}
            <span className="postDate">{post.strArea} Cuisine</span>
        </div>

        <p className="postDesc">{post.strInstructions}</p>

      {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p> */}
    </div>
  );
}