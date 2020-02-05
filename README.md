# LawSampo Semantic Portal 

Based on https://github.com/SemanticComputing/sampo-web-app

master branch visible at http://test.lakisampo.fi (password protected)

## Requirements

Node.js https://nodejs.org/en/ (tested with 10.15.3 LTS)

Nodemon https://nodemon.io/

If your home directory is mounted from a network drive, Node.js should
be installed using Node Version Manager https://github.com/nvm-sh/nvm  

## Local development

Install the dependencies specified in `package.json` (this command needs to be run only once,
  as long as you don't modify the dependencies):

`npm install`

Run client and server concurrently:

`npm run dev`

## Deploy with Docker

### Build
 `docker build -t sampo-web-app-image .`

### Run
 `docker run -d -p 3006:3001 --name sampo-web-app sampo-web-app-image`

 ### Run with password protected endpoint
 `docker run -d -p 3006:3001 -e SPARQL_ENDPOINT_BASIC_AUTH=your_password --name sampo-web-app sampo-web-app-image`

### Upgrade
```
docker build -t sampo-web-app-image .
docker stop sampo-web-app
docker rm sampo-web-app
docker run -d -p 3006:3001 --name sampo-web-app sampo-web-app-image
```

