# Five9-Hubspot Dialer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It utilizes patterns from the following repositories to allow click-to-dial and engagement creation in Hubspot using the Five9 Agent Desktop Toolkit Plus:

* [HubSpot/calling-extensions-sdk](https://github.com/HubSpot/calling-extensions-sdk)
* [Five9DeveloperProgram/Five9CRMSDKSamples](https://github.com/Five9DeveloperProgram/Five9CRMSDKSamples)

Further Five9 and Hubspot documentation:

* [Hubspot Calling Extensions SDK](https://developers.hubspot.com/docs/api/crm/extensions/calling-sdk)
* [Five9 Agent Desktop Toolkit](https://app.five9.com/dev/sdk/crm/latest/doc/global.html)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Heroku

Heroku is not a requirement, but was used to quickly spin up a production environment. See [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) for more information. Once you have an account and the Heroku CLI installed:

See existing Procfile for production build commands.

`heroku create [APP_NAME]`

`git push heroku main`

`heroku ps:scale web=1 api=1`

`heroku open`