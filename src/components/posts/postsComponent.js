import Post from "../post/postComponent";
import "./postsComponent.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p}/>
      ))}
    </div>
  );
}