import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Signin extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email, 
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/auth/signin', user)
            .then(res => console.log(res.data));

        this.setState({
            email: '',
            password: ''
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="form-div">
                        <h3>Signin</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Email: </label>
                                <input type="text" placeholder="Email" required className="form-control" value={this.state.email} onChange={this.onChangeEmail}/>
                            </div>

                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password" placeholder="Password" required className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-primary"/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}