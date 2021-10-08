import "./single.css";
import SinglePost from "../../components/singlePost/singlePostComponent";
import Sidebar from "../../components/sidebar/sidebarComponent";

export default function Single() {
  return (
    <div className="single">
      <SinglePost/>
      <Sidebar/>
    </div>
  );
}