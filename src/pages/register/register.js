import { Link } from "react-router-dom"
import { useState } from "react";
import "./register.css"
import axios from "axios";

export default function Register() {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try{
      const res = await axios.post("http://localhost:5000/auth/register", {
        fullName,
        email, 
        password
      });

      res.data && window.location.replace("/login");
    }
    catch(err){
      //setError(true);
      setError(err.response.data);
    }
  };

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm"  onSubmit={handleSubmit}>
        <label>Name</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."  onChange={(e) => setFullname(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."  onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."  onChange={(e) => setPassword(e.target.value)}/>
        <button className="registerButton" type="submit">Register</button>
      </form>
        {/* <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button> */}
        {/* {error && <span style={{color:"red", marginTop: "10px"}}>Something went wrong! Please try again later.</span>} */}
        {error && (<p  style={{color: "red", textAlign:"center", marginTop:"20px"}}>{error}</p>)}
    </div>
    )
}