import "./setting.css"
import Sidebar from "../../components/sidebar/sidebarComponent"
import { useState, useContext} from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting(){
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({type:"UPDATE_START"})
        
        const updatedUser = {
            userId: user._id,
            fullName,
            email,
            oldPassword,
            password
        }

        try{
            const res = await axios.put("http://localhost:5000/user/" + user._id, updatedUser);
            setSuccess(true);
            setError(false);
            dispatch({type:"UPDATE_SUCCESS", payload:res.data})
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
            setError(err.response.data);
            setSuccess(false);
        }
    };

    return(
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                {/* <span className="settingsDeleteTitle">Delete Account</span> */}
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    {/* <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                        src="https://assets.vogue.com/photos/5fa97ba7bcdde44e3770851a/master/w_1600%2Cc_limit/VO1220_Cover.jpg"
                        alt=""
                        />
                        <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        />
                    </div> */}
                    <label>Username</label>
                    <input type="text" placeholder={user.fullName} onChange={(e) => setFullname(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Old Password</label>
                    <input type="password" placeholder="Please enter your current password." onChange={(e) => setOldPassword(e.target.value)}/>
                    <label>New Password</label>
                    <input type="password" placeholder="Please enter your new password." onChange={(e) => setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>

                    {success && (<span style={{color: "green", textAlign:"center", marginTop:"20px"}}>Profile has been updated...</span>)}
                    {error && (<p  style={{color: "red", textAlign:"center", marginTop:"20px"}}>{error}</p>)}
                </form>
            </div>
      <Sidebar />
    </div>
    )
}