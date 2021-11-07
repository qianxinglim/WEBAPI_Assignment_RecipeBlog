import{BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar/navbarComponent";
import Signup from "./pages/signupComponent";
import Signin from "./pages/signinComponent";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Favourite from "./pages/favourite/favourite";
import Single from "./pages/single/single";
import Setting from "./pages/setting/setting";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route exact path="/"> <Home/> </Route> */}
          <Route path="/favourite"> {user ? <Favourite/> : <Login/>} </Route>
          <Route path="/login"> {user ? <Home/> : <Login/>} </Route>
          <Route path="/register"> {user ? <Home/> : <Register/>} </Route>
          <Route path="/profile"> {user ? <Setting/> : <Login/>} </Route>
          <Route path="/post/:postId"> <Single/> </Route>

          <Route path="/signin"> <Signin/> </Route>
          <Route path="/signup"> <Signup/> </Route>
        </Switch>
    </Router>
  );
}

export default App;
