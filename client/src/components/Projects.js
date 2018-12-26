import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { markdownToHtml } from "../util";
import moment from "moment";
import {
  InteriorMenu,
  InteriorSubMenu,
  PostMarkup,
  FlexContainer,
  HeaderImage,
  PostTitle,
  PostSubCategory,
  PostContent,
  PostContainer,
  PostDetailsContainer,
  PostDetails,
  PostDetailsTitle,
  PostDetailsDescription,
  PostDetailsLine
} from "./partials";
import { MENU } from "../content.json";

class Projects extends Component {
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
            category: "Projects"
          });
          let post = posts[0];
          this.setState({ posts, post, scrollTop: 0 });
        } else window.location.replace("/error");
      })
      .catch(err => {
        window.location.replace("/error");
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
    if (
      document.documentElement.scrollTop > window.innerHeight * 0.12 &&
      document.documentElement.scrollTop > this.state.scrollTop &&
      this.subMenu
    )
      this.subMenu.hide();
    else if (
      document.documentElement.scrollTop > window.innerHeight * 0.12 &&
      document.documentElement.scrollTop < this.state.scrollTop &&
      this.subMenu
    )
      this.subMenu.show();
    _.map(Object.keys(this.sections), sectionId => {
      if (
        this.sections[sectionId].offsetTop -
          document.documentElement.scrollTop <=
          165 &&
        this.sections[sectionId].offsetTop -
          document.documentElement.scrollTop >
          0
      ) {
        this.setState({ post: _.find(this.state.posts, { id: sectionId }) });
        if (this.subMenu) this.subMenu.scrollElement();
      }
    });
    if (document.documentElement.scrollTop !== this.state.scrollTop)
      this.setState({ scrollTop: document.documentElement.scrollTop });
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
        <InteriorSubMenu
          post={this.state.post}
          posts={this.state.posts}
          ref={ref => (this.subMenu = ref)}
        />
        {this.state.posts.map(this.renderPosts.bind(this))}
      </article>
    ) : null;
  }
}

export default Projects;
