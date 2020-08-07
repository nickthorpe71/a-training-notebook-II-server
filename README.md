# a training notebook installation

## Cloning
After cloning from github:

rm -rf .git && git init
Now you have no previous commits in the test-project for a fresh git project.

Now install the npm dependencies npm install.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying API

When you're ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Deploying Database

Using the provided migration files, deploy your Postgres database to heroku.

Further instructions: 
https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres


# API documentation
