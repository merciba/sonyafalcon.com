"use strict";

const moment = require("moment");
const axios = require("axios");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.authenticate = (event, context, callback) => {
  try {
    if (event.headers && event.headers.Authorization) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
            event.headers.Authorization
          }`
        )
        .then(res => {
          let params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
              id: res.data.email
            }
          };
          dynamodb.get(params, (err, result) => {
            if (err) fail(context, 500, new Error(err));
            else {
              succeed(context, {
                msg: `Successfully authenticated user`,
                user: {
                  email: res.data.email,
                  firstName: res.data.given_name,
                  lastName: res.data.family_name,
                  picture: res.data.picture
                }
              });
            }
          });
        })
        .catch(() => fail(context, 401, new Error("Unauthorized")));
    } else fail(context, 401, new Error("Unauthorized"));
  } catch (err) {
    fail(context, 500, new Error(err));
  }
};

module.exports.createUser = (event, context, callback) => {
  try {
    if (event.headers && event.headers.Authorization) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
            event.headers.Authorization
          }`
        )
        .then(res => {
          if (res.data.email === process.env.ADMIN_EMAIL) {
            // Remove this conditional expression to allow non-admin users.
            let params = {
              TableName: process.env.DYNAMODB_TABLE,
              Item: {
                id: res.data.email,
                firstName: res.data.given_name,
                lastName: res.data.family_name,
                picture: res.data.picture,
                timestamp: moment.utc().format(),
                lastLogin: moment.utc().format(),
                admin: res.data.email === process.env.ADMIN_EMAIL
              }
            };
            dynamodb.put(params, err => {
              if (err) fail(context, 500, new Error(err));
              else
                succeed(context, {
                  msg: `Successfully created user ${res.data.email}`
                });
            });
          } else fail(context, 401, new Error("Unauthorized"));
        })
        .catch(() => fail(context, 401, new Error("Unauthorized")));
    } else fail(context, 401, new Error("Unauthorized"));
  } catch (err) {
    fail(context, 500, new Error(err));
  }
};

module.exports.login = (event, context, callback) => {
  try {
    if (event.headers && event.headers.Authorization) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
            event.headers.Authorization
          }`
        )
        .then(res => {
          let params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
              id: res.data.email
            }
          };
          dynamodb.get(params, (err, result) => {
            if (err) fail(context, 500, new Error(err));
            else {
              let updateParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                  id: res.data.email
                },
                ExpressionAttributeNames: {
                  "#newLoginTime": "newLoginTime"
                },
                ExpressionAttributeValues: {
                  ":lastLogin": moment.utc().format()
                },
                UpdateExpression: "SET #newLoginTime = :lastLogin",
                ReturnValues: "ALL_NEW"
              };
              dynamodb.update(updateParams, (err, result) => {
                if (err) fail(context, 500, new Error(err));
                else {
                  succeed(context, {
                    msg: `Successfully authenticated user`,
                    email: res.data.email
                  });
                }
              });
            }
          });
        })
        .catch(() => fail(context, 401, new Error("Unauthorized")));
    } else fail(context, 401, new Error("Unauthorized"));
  } catch (err) {
    fail(context, 500, new Error(err));
  }
};

module.exports.addEmailToList = (event, context, callback) => {
  try {
    axios({
      url: "https://api.sendgrid.com/v3/contactdb/recipients",
      headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
      method: "post",
      data: [event.body]
    })
      .then(res =>
        succeed(context, {
          msg: `User ${event.body.email} successfully subscribed to newsletter.`
        })
      )
      .catch(() => fail(context, 401, new Error("Unauthorized")));
  } catch (err) {
    fail(context, 500, new Error(err));
  }
};

function succeed(context, body) {
  context.succeed({ statusCode: 200, body });
}

function fail(context, code, err) {
  context.succeed({ statusCode: code, err: err.toString() });
}
