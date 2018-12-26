import "babel-polyfill";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Router from "./components/Router.js";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";
import PostEditor from "./components/PostEditor.js";
import ContentEditor from "./components/ContentEditor.js";
import Login from "./components/Login.js";
import Post from "./components/Post.js";
import About from "./components/About.js";
import CaseStudies from "./components/CaseStudies.js";
import Projects from "./components/Projects.js";
import ErrorPage from "./components/ErrorPage.js";
import { screenIs } from "./components/partials";

import axios from "axios";
import { noMatch } from "./utils";
import Promise from "bluebird";
import $ from "jquery";
import screenOrientation from "screen-orientation";

window.$ = $;
window.env = $("[data-env]").data("env");
window.config = require(`./api.js`);
window.api = {
  user: axios.create(window.config.user),
  post: axios.create(window.config.post),
  page: axios.create(window.config.page)
};
window.cdn = "https://s3.amazonaws.com/cdn.sonyafalcon.com";
window.x = window.innerWidth;
window.y = window.innerHeight;
window.getFirstWords = (sentence, n) => {
  let result = sentence;
  let resultArray = result.split(" ");
  if (resultArray.length > n) {
    resultArray = resultArray.slice(0, n);
    result = resultArray.join(" ") + "…";
  }
  return result;
};
window.noMatch = noMatch;
window.Promise = Promise;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    window.onresize = () => this.forceUpdate();
  }
  authenticate() {
    return new Promise((resolve, reject) => {
      let token = window.localStorage.getItem("id_token");
      if (token) {
        return axios({
          method: "post",
          url: `${window.config.user}/authenticate`,
          headers: { Authorization: token }
        })
          .then(data => {
            window.localStorage.setItem(
              "user",
              JSON.stringify(data.data.body.user)
            );
            this.setState({ authenticated: true });
            return data;
          })
          .then(resolve)
          .catch(() => {
            window.location.replace("/login");
          });
      } else reject(new Error("No ID Token"));
    });
  }
  render() {
    return screenIs("mobile") &&
      screenOrientation().direction === "landscape" ? (
      <div style={{ width: "100%", height: "100%" }}>
        Landscape orientation is not supported on this device. Please rotate
        back to portrait mode.
      </div>
    ) : (
      <div
        style={{
          height: window.innerHeight,
          fontFamily: "Work Sans, sans-serif"
        }}
      >
        <Router regex="^\/$" path="/">
          <Home />
        </Router>
        <Router regex="/login$" path="/login">
          <Login />
        </Router>
        <Router regex="/dashboard$" path="/dashboard" protected>
          <Dashboard authenticate={this.authenticate.bind(this)} />
        </Router>
        <Router regex="/editor$" path="/editor" protected>
          <PostEditor authenticate={this.authenticate.bind(this)} />
        </Router>
        <Router regex="/editor\/\S+$" path="/editor/:id" protected>
          <PostEditor authenticate={this.authenticate.bind(this)} />
        </Router>
        <Router regex="/content$" path="/content" protected>
          <ContentEditor authenticate={this.authenticate.bind(this)} />
        </Router>
        <Router regex="/about$" path="/about">
          <About />
        </Router>
        <Router regex="/case-studies$" path="/case-studies">
          <CaseStudies />
        </Router>
        <Router regex="/projects$" path="/projects">
          <Projects />
        </Router>
        <Router regex="/error$" path="/error">
          <ErrorPage />
        </Router>
        <Router regex="/\S+$" path="/:id">
          <Post />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App env={window.env} />, document.getElementById("root"));
