"use strict";

const helpers = require("./helpers");

module.exports.createPost = (event, context, callback) => {
  helpers
    .createPost(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.updatePost = (event, context, callback) => {
  helpers
    .updatePost(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.getPost = (event, context, callback) => {
  helpers
    .getPost(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.getPosts = (event, context, callback) => {
  helpers
    .getPosts(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.deletePost = (event, context, callback) => {
  helpers
    .deletePost(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.getMediaLibrary = (event, context, callback) => {
  helpers
    .getMediaLibrary(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.getS3UploadCredentials = (event, context, callback) => {
  helpers
    .getS3UploadCredentials(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.getS3DeleteCredentials = (event, context, callback) => {
  helpers
    .getS3DeleteCredentials(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 401, new Error(err)));
};

module.exports.publish = (event, context, callback) => {
  helpers
    .publish(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 500, new Error(err)));
};

module.exports.publishScheduled = (event, context, callback) => {
  helpers
    .publishScheduled(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 500, new Error(err)));
};

module.exports.prerender = (event, context, callback) => {
  helpers
    .prerender(event)
    .then(result => helpers.succeed(context, result))
    .catch(err => helpers.fail(context, 500, new Error(err)));
};
