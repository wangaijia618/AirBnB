
# Create React App Template

A no-frills template from which to create React + Redux applications with
[Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app my-app --template @appacademy/react-redux-v17 --use-npm
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all

cd ..
to upper level
<!-- dotenv npx sequelize db:migrate
dotenv npx sequelize db:migrate:undo
dotenv npx sequelize db:seed:all
dotenv npx sequelize db:seed:undo:all -->
local dev.db setting up => cd back end
then:
npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all

cd backend and npm start, then cd frontend npm start
Method #1 - Reset via CLI
1.	heroku run npm run sequelize db:seed:undo:all
2.	heroku run npm run sequelize db:migrate:undo:all
3.	heroku run npm run sequelize db:migrate
4.	heroku run npm run sequelize db:seed:all

Method #2 - Reset from Heroku database page
1.	Go to your Heroku app dashboard > Resources
2.	Click Heroku Postgres <-- this will take you to a new tab
3.	Go to Settings tab, and click Reset database
4.	type in the name of your Heroku app
5.	Back in our terminal, follow step 3 and 4 from Method #1
Method #3 - Delete/Reinstall Heroku Postgres
1.	Go to your Heroku app dashboard > Resources
2.	Click vertical "<>'" icon, and delete add-on
3.	Search “Heroku Postgres” on the add on search bar
4.	Add free hobby - dev plan, and place order
5.	Back in our terminal, follow step 3 and 4 from Method #1
