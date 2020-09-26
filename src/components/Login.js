import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Swal from 'sweetalert2'

import '../App.css';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleLogIn(e) {
    e.preventDefault();

    if (!this.state.username && !this.state.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a username and password.',
      });
    } else if (!this.state.username) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a username.',
      });
    } else  if (!this.state.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a password.',
      });
    } else {
      this.setState({
        message: "",
        loading: true
      });

      AuthService.login(this.state.username, this.state.password)
        .then(
          res => {
            console.log("success res: ", res);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'You are now logged in',
              footer: 'Redirecting you to your dashboard...',
              showConfirmButton: false,
              timer: 1500
            })
              .then( () => {
                this.props.history.push("/profile");
                window.location.reload();
              })
          }
        ).catch(error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            
          this.setState({ loading: false });
          Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: `${resMessage} Please try again.`, 
            footer: 'Or, if you have not yet signed up, please do so.'
          })
        });
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron jumbo">
            <div className="row">
              <div className="col-sm-12 logo">
                <span className="welcome-to">Log In </span>Quick Budget
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 welcome-subtitle">
                <div className="subtitle">
                  If you already have an account, enter your information below.
                </div>
              </div>
            </div>
            <form>
              <div className="form-group">

                <div className="row">
                  <div className="col-sm-12">
                    <div className="card login-label">

                      <label htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} 
                        className="form-control login-form" 
                        placeholder="Enter Username Here" 
                      />

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="card login-label">
                      <label htmlFor="password">Password</label>
                      <input 
                        type="password" 
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} 
                        className="form-control login-form" 
                        placeholder="Enter Password Here"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-signup"
                      disabled={this.state.loading}
                      onClick={this.handleLogIn}
                      >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                      <span>Log In</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}