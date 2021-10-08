import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: ''
        }
    }

    onChangeFullName(e){
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
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
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/auth/signup', user)
            .then(res => console.log(res.data));

        this.setState({
            fullName: '',
            username: '',
            email: '',
            password: ''
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="form-div">
                        <h3>Register</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Full Name: </label>
                                <input type="text" placeholder="Full Name" required className="form-control" value={this.state.fullName} onChange={this.onChangeFullName}/>
                            </div>

                            <div className="form-group">
                                <label>Username: </label>
                                <input type="text" placeholder="Username" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                            </div>

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