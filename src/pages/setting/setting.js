import "./setting.css"
import Sidebar from "../../components/sidebar/sidebarComponent"

export default function Setting(){
    return(
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
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
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Momota"/>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="momota@gmail.com"/>
                    <label>Password</label>
                    <input
                        type="password"/>
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                </form>
            </div>
      <Sidebar />
    </div>
    )
}