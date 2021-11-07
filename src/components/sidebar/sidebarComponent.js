import axios from "axios";
import { useEffect, useState } from "react";
import "./sidebarComponent.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [areas, setAreas] = useState([]);
  //const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getCats = async() => {
      const res = await axios.get("http://localhost:5000/category");
      setCats(res.data)
    }

    const getAreas = async() => {
      const res = await axios.get("backend/category/area");
      setAreas(res.data)
    }

    getCats();
    getAreas();

  },[]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img className="sidebarImg"
          src="https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Salsa-verde-baked-eggs-80334f1.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
    	    {cats.map((c) => (
            <Link to={`/?category=${c.strCategory}`} className="link">
              <li className="sidebarListItem">{c.strCategory}</li>
            </Link>
          ))}

          {/* <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Cinema</li> */}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">AREAS</span>
        <ul className="sidebarList">
    	    {areas.map((a) => (
            <Link to={`/?area=${a.strArea}`} className="link">
              <li className="sidebarListItem">{a.strArea}</li>
            </Link>
          ))}
        </ul>
      </div>

      {/* <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div> */}
    </div>
  );
}