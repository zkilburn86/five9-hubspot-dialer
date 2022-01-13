# Five9-Hubspot Dialer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It utilizes patterns from the following repositories to allow click-to-dial and engagement creation in Hubspot using the Five9 Agent Desktop Toolkit Plus:

* [HubSpot/calling-extensions-sdk](https://github.com/HubSpot/calling-extensions-sdk)
* [Five9DeveloperProgram/Five9CRMSDKSamples](https://github.com/Five9DeveloperProgram/Five9CRMSDKSamples)

Further Five9 and Hubspot documentation:

* [Hubspot Calling Extensions SDK](https://developers.hubspot.com/docs/api/crm/extensions/calling-sdk)
* [Five9 Agent Desktop Toolkit](https://app.five9.com/dev/sdk/crm/latest/doc/global.html)

## Running Locally
---
### Requirements
To run the project locally, you will need the following:
* [Docker](https://www.docker.com/products/docker-desktop)
* Docker compose (if it is not installed by docker)

### Setup
Follow the these steps in the terminal:
1. `cd /path/to/five9-hubspot-dialer/directory`
1. `cp .env.sample .env`
1. `vim .env`
1. Replace the sample values with the required values
1. `docker compose build` (depending on your setup, it may be `docker-compose` instead)

### Running
There are currently two ways to run the application. For the core app, you'll want to execute this in the terminal: `docker compose up`

If you want to run the entire environment to do more integration testing, please run the following command: `docker compose --profile full up`

## Available Scripts
---

In the project directory, you can run:

### `yarn build`

Installs dependencies and builds the react ui contained in the `react-ui` directory.\
Compiles the server code contained in the `server` directory. \
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`

Runs the dialer in the development mode.\
Serves the static build files via the server and is equivalent to running `node ./server/dist/index.js` \
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `yarn deploy`

This adds all tracked files and creates a commit with a "heroku deploy" message. \
It then pushes to the origin main branch and Heroku main to build and deploy.

## Heroku
---

Production version live on Heroku at [five9-hubspot-dialer.herokuapp.com](https://five9-hubspot-dialer.herokuapp.com)
See [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) for more information. \
Once you have an account and the Heroku CLI installed:

`heroku create [APP_NAME]`

`yarn build`

`yarn deploy`

`heroku ps:scale web=1`

`heroku open`
