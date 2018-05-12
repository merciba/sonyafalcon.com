import React, { Component } from "react";
import styled from "styled-components";

export const SubmitButton = styled.button`
  margin: 7px;
`;

export const ReadMore = styled.button`
  flex: 1;
  background-color: #e2e9ed;
  height: 50px;
  color: black;
  font-size: 1rem;
  padding: 7px;
  margin: 7px;
  box-shadow: none;
  border-radius: 0;
  border: none;
  font-family: Work Sans, sans-serif;
  cursor: pointer;
`;

export const Explore = styled.button`
  flex: 1;
  height: 50px;
  box-sizing: border-box;
  background-color: white;
  color: black;
  font-size: 1rem;
  padding: 7px;
  margin: 7px;
  border: 1px solid black;
  border-radius: 0;
  font-family: Work Sans, sans-serif;
  cursor: pointer;
`;

export const PublishButton = styled.a`
  margin: 10px 10px 0 0;
`;

export const AddTextButton = styled.div`
  flex: 0.3;
  height: 50%;
  width: auto;
  background: url("https://cdn0.iconfinder.com/data/icons/tab-bar-ios-and-wp8-vector-icons/48/align_left-512.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const AddMediaButton = styled.div`
  flex: 0.3;
  height: 50%;
  width: auto;
  background: url("https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_12-512.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const PostDetailsRemove = styled.button`
  flex: 1;
  width: 50%;
  background: red;
  color: white;
  padding: 7px;
  margin: 0 0 10px 0;
  border-radius: 3px;
  align-self: center;
`;

export const PostDetailsEditSubmit = styled.button`
  flex: 1;
  margin: 10px;
  height: auto;
  background-color: #00d1b2;
  border-radius: 3px;
  color: white;
`;
