import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import moment from "moment";
import Animated from "animated/lib/targets/react-dom";
import {
  Title,
  SubTitle,
  LargeText,
  Text,
  SmallText,
  BoldText,
  LogoType,
  Input,
  Tags,
  Tag
} from "./text";
import { SubmitButton, ReadMore, Explore } from "./buttons";
import { BackgroundImage, FullScreenImage, HalfScreenImage } from "./images";
import { Menu } from "./menu";
import { media, screenIs } from "./breakpoints";
import { MENU, FOOTER } from "../../content.json";
import Parallax from "react-springy-parallax";
import slug from "slugg";

export const FullScreenContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const PostInfoContainer = styled.div`
  background: white;
  padding: 15px;
  position: absolute;
  bottom: 0;
  left: 50px;
  height: 450px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 7px 0;
`;

export const TopLeftWidget = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
`;

export const TopCenterWidget = styled.img`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: auto;
`;

export const TopRightWidget = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const BottomLeftWidget = styled.img`
  position: absolute;
  bottom: 15px;
  left: 15px;
`;

export const BottomRightWidget = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 25vh;
  position: absolute;
  top: 25vh;
  ${media.mobile`padding: 55px;`}
  padding: auto;
  justify-content: center;
`;

export const ComingSoon = styled.div`
  position: absolute;
  top: 32%;
  width: 100%;
  text-align: center;
`;

export const PostContainer = styled.div`
  padding: 15px;
`;

export const PostDetailsContainer = styled.div`
  float: right;
  width: 30%;
  margin-top: -10vh;
  ${media.mobile`margin-top: 0;`}
  ${media.mobile`width: 100%;`}
  padding-left: 15px;
`;

export const PostDetails = styled.div`
  width: 100%;
`;

export const PostDetailsLine = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 0.5px solid #979797;
`;

export const PostDetailsEdit = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 3px;
  background-color: white;
  position: relative;
`;

export const AddContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 14px;
  height: 15vh;
  border-radius: 5px;
  background-color: #eee;
`;

export const ImageSection = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-around;
  padding: 14px 0;
  height: auto;
`;

export const Footer = () => (
  <footer
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      background: "white",
      width: "100%",
      height: 80
    }}
  >
    <a href="http://merciba.com">
      <span style={{ fontSize: 15, color: "black", flex: 1, marginLeft: 30 }}>
        {FOOTER.LEFT}
      </span>
    </a>
  </footer>
);
