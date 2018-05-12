import React, { Component } from "react";
import credentials from "../../../credentials.json";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { user } from "../api";
import url from "url";

class Login extends Component {
  responseGoogle(googleUser) {
    let authResponse = googleUser.getAuthResponse();
    axios({
      method: "post",
      url: `${user}/login`,
      headers: { Authorization: authResponse.id_token }
    })
      .then(res => {
        window.localStorage.setItem("id_token", authResponse.id_token);
        window.localStorage.setItem("email", res.data.body.email);
        window.location.href = "/dashboard";
      })
      .catch(console.log);
  }
  error(err) {
    console.log(err);
    // window.location.href = '/login'
  }
  render() {
    return (
      <section className="section" style={{ height: "100%" }}>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title" style={{ margin: 30 }}>
                Sonya Falcon
              </h1>
              <h2 className="subtitle" style={{ margin: 30 }}>
                Login
              </h2>
              <div className="field" style={{ margin: 30 }}>
                <div className="control">
                  <GoogleLogin
                    className="button is-info"
                    clientId={credentials.google.clientId}
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle.bind(this)}
                    onFailure={this.error.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
