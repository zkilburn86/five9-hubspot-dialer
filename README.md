# Five9-Hubspot Dialer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It utilizes patterns from the following repositories to allow click-to-dial and engagement creation in Hubspot using the Five9 Agent Desktop Toolkit Plus:

* [HubSpot/calling-extensions-sdk](https://github.com/HubSpot/calling-extensions-sdk)
* [Five9DeveloperProgram/Five9CRMSDKSamples](https://github.com/Five9DeveloperProgram/Five9CRMSDKSamples)

Further Five9 and Hubspot documentation:

* [Hubspot Calling Extensions SDK](https://developers.hubspot.com/docs/api/crm/extensions/calling-sdk)
* [Five9 Agent Desktop Toolkit](https://app.five9.com/dev/sdk/crm/latest/doc/global.html)

## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `react-ui/build` folder.\
Compiles the Server code `cd server && tsc`. \
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn compile`

This executes Typescript compliation in the `server` folder.\
This is necessary after changes to server files.

### `yarn start`

Runs the dialer in the development mode.\
Serves the static build files via the server and is equivalent to running `node server/dist/index.js` \
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Heroku

Production version live on Heroku at [five9-hubspot-dialer.herokuapp.com](https://five9-hubspot-dialer.herokuapp.com)
See [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) for more information. \
Once you have an account and the Heroku CLI installed:

`heroku create [APP_NAME]`

`git push heroku main`

`heroku ps:scale web=1`

`heroku open`