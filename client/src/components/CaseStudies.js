import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { markdownToHtml } from "../util";
import moment from "moment";
import { InteriorMenu, InteriorSubMenu, PostMarkup } from "./partials";
import { MENU } from "../content.json";

class CaseStudies extends Component {
  componentDidMount() {
    this.sections = {};
    window.onscroll = this.onScroll.bind(this);
    let id = window.location.pathname.replace("/", "");
    if (/.html$/.test(id)) id = id.replace(".html", "");
    this.getPosts()
      .then(res => {
        if (res.data.body && res.data.body.length) {
          let posts = _.filter(res.data.body, {
            published: true,
            category: "Case Studies"
          });
          let post = posts[0];
          this.setState({ posts, post });
        } else window.location.replace("/error");
      })
      .catch(err => {
        console.log(err);
        // window.location.replace('/error')
      });
  }
  getPosts() {
    return axios({ method: "get", url: `${window.config.post}` });
  }
  createMarkup(post) {
    let html = markdownToHtml(post.rawText);
    return { __html: html };
  }
  onScroll(event) {
    _.map(Object.keys(this.sections), sectionId => {
      if (
        this.sections[sectionId].offsetTop -
          document.documentElement.scrollTop <=
        160
      ) {
        this.setState({ post: _.find(this.state.posts, { id: sectionId }) });
      }
    });
  }
  renderPosts(post) {
    return (
      <section
        ref={ref => {
          this.sections[`${post.id}`] = ref;
        }}
      >
        <PostMarkup post={post} />
      </section>
    );
  }
  render() {
    return this.state ? (
      <article>
        <InteriorMenu content={MENU} post={this.state.post} />
        <InteriorSubMenu post={this.state.post} posts={this.state.posts} />
        {this.state.posts.map(this.renderPosts.bind(this))}
      </article>
    ) : null;
  }
}

export default CaseStudies;
