import {Link} from 'react-router-dom';
import "./navbarComponent.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Navbar(){
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }

    return (
        <div className="top">
          <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
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
              <li className="topListItem">
                <Link className="link" to="/">
                  ABOUT
                </Link>
              </li>
            </ul>
          </div>
          <div className="topRight">
            {user ? (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/setting">
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
            <i className="topSearchIcon fa fa-search"></i>
          </div>
        </div>
    );
    
}