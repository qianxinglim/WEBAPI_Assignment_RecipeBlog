import { Context } from "../../context/Context";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});

    try{
      const res = await axios.post("http://localhost:5000/auth/login",{
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
      console.error(err.response.data);
      setError(err.response.data);
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   axios.post("http://localhost:5000/auth/login",{
  //     email: email,
  //     password: password
  //   }).then((response) => {
  //     if(!response.data.auth){
  //       setLoginStatus(false);
  //     }
  //     else{
  //       //console.log(response.data);
  //       setLoginStatus(true);
  //       localStorage.setItem("token", response.data.token);
  //       window.location = '/';
  //     }
  //     console.log(response);
  //   });
  // };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." ref={emailRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        {/* <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button> */}

      {error && (<p  style={{color: "red", textAlign:"center", marginTop:"20px"}}>{error}</p>)}
    </div>
  );
}