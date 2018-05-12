import React, { Component } from "react";
import styled from "styled-components";
import { AddContentContainer, AddTextButton, AddMediaButton } from "./index";

export const TitleInput = styled.input`
  font-size: 36px;
  height: 45px;
  margin-top: 0;
  display: block;
`;

export const TitleImage = styled.div`
  overflow: hidden;
  height: 300;
  width: 100%;
  margin-top: 15;
`;

export const TitlePreview = styled.div`
  font-size: 36px;
  height: 45px;
  margin-top: 0;
  display: block;
`;

export const PreviewContainer = styled.div`
  float: right;
  width: 45%;
  height: 100%;
  margin-left: 15px;
  display: block;
`;

export const EditorContainer = styled.div`
  width: 45%;
  height: 75%;
  margin-right: 15px;
  display: block;
`;

export const Notification = styled.p`
  margin: 10px 15px 10px 0;
  font-size: 12px;
`;

export const AddContent = ({ onTextClick, onImageClick }) => (
  <AddContentContainer>
    <AddTextButton onClick={onTextClick} />
    <AddMediaButton onClick={onImageClick} />
  </AddContentContainer>
);
