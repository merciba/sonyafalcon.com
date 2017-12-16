# Sonya Falcon's Portfolio Website

Sonya Falcon's portfolio website.

Built with a 100% serverless architecture.

## Getting Started

```
git clone git@github.com:merciba/sonyafalcon.com.git
cd sonyafalcon.com && yarn
```

## Running the Development Environment

```
yarn dev
```

You must create a file called `credentials.json` in the project root, containing:

```
{
  "accessKeyId": "<AWS Access Key Id>",
  "secretAccessKey": "<AWS Secret Access Key>",
  "region": "<AWS Region>"
}
```

These credentials must also be set up for use with the AWS CLI, in `~/.aws/credentials`

This will open up your browser at localhost:4000, and live-reload using BrowserSync.

## Deploying the Web App

```
yarn deploy
```

This will package the client js and html files, prerender the posts/pages, version them, and upload them to S3, deploying the website to production.

A CloudFront distribution is already set up to serve this bucket as a website, at http://.cloudfront.net, which the domain http://sonyafalcon.com points to.

Wait a few minutes and the site will update.

## Deploying the APIs

```
yarn deploy-apis
```

will deploy all Serverless projects in the /api folder.
