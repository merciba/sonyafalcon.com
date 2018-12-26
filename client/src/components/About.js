import React, { Component } from "react";
import _ from "lodash";
import {
  InteriorMenu,
  H5,
  PostTitle,
  PostSubCategory,
  PostContent,
  FlexContainer,
  screenIs
} from "./partials";
import { MENU, ABOUT } from "../content.json";

class About extends Component {
  renderParagraphs(text, index) {
    return (
      <p
        style={{ padding: "7px 0", display: "flex", flex: 1, lineHeight: "3vh" }}
        dangerouslySetInnerHTML={{ __html: text }}
        key={index}
      />
    );
  }

  renderLinks({ title, url }, index) {
    return (
      <a href={url}>
        <H5
          style={{
            flex: 1,
            color: "#FF696B",
            maxHeight: 35,
            width: "25vh",
            fontSize: 20,
            letterSpacing: 1,
            lineHeight: "4vh"
          }}
          key={index}
        >
        {title}
        </H5>
      </a>
    );
  }

  render() {
    return (
      <article>
        <InteriorMenu content={MENU} post={{ category: "About" }} ref="menu" />
        <FlexContainer
          style={{
            height: "100%",
            padding: screenIs("mobile") ? 15 : 30,
            marginTop: "12vh",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: screenIs("mobile") ? "column" : "row"
          }}
        >
          <div
            style={{
              flex: 1,
              marginRight: screenIs("mobile") ? 0 : 15,
              maxHeight: "80%",
              overflow: "hidden"
            }}
          >
            <img style={{ width: "100%", marginTop: "-25%" }} src={ABOUT.IMG} />
          </div>
          <PostContent
            style={{
              flex: 1,
              fontSize: "2vh",
              marginLeft: screenIs("mobile") ? 0 : 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <PostTitle style={{ paddingLeft: 0 }}>{ABOUT.TITLE}</PostTitle>
            <PostSubCategory style={{ paddingLeft: 0 }}>{ABOUT.SUBTITLE}</PostSubCategory>
            {ABOUT.CONTENT.map(this.renderParagraphs.bind(this))}
            <br />
            {ABOUT.LINKS.map(this.renderLinks.bind(this))}
          </PostContent>
        </FlexContainer>
      </article>
    );
  }
}

export default About;
