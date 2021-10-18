import {Link} from 'react-router-dom';
import "./navbarComponent.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Navbar(){
  const [keyword, setKeyword] = useState("");
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }

    return (
        <div className="top">
          <div className="topLeft">
            {/* <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-instagram-square"></i> */}

            <ul className="topList">
              <li className="topListItem2">
                <input className="searchInput" type="text" placeholder="Search..." onChange={e=>setKeyword(e.target.value)}/>
              </li>

              <li className="topListItem">
              <Link to={`/?search=${keyword}`} className="link topSearchIcon fa fa-search"></Link>
                {/* <button className="topSearchIcon fa fa-search" type="submit"></button> */}
              </li>
            </ul>
          </div>
          <div className="topCenter">
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/">
                  HOME
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/favourite">
                  FAVOURITES
                </Link>
              </li>
              {/* <li className="topListItem">
                <Link className="link" to="/">
                  ABOUT
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="topRight">
            {user ? (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/profile">
                    PROFILE
                  </Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>
              </ul>
            ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            )}

              {/* <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul> */}

              

            {/* <i className="topSearchIcon fa fa-search"></i> */}
          </div>
        </div>
    );
    
}