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


# a training notebooke API documentation

After deploying an instance of this API use this documentation to access it

## BASE_URL

https://[herokuURL]/api/

## Get workouts by date: 

### Method: GET

### URL Params

Required: workout_date=[date]

### Success Response:

Code: 200
Content: [{ 
  user_id,
  title,
  workout_start_time,
  workout_end_time,
  workout_date,
  exercises
 }]

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR

Code: 400 BAD REQUEST
Content: { error : "bad request" }

### Sample Call:

BASE_URL/workouts/[user_id(int)]?workout_date=[date]

## Get workouts by month: 

### Method: GET

### URL Params

Required: 
month=[int]
year=[int]

### Success Response:

Code: 200
Content: [{ 
  user_id,
  title,
  workout_start_time,
  workout_end_time,
  workout_date,
  exercises
 }]

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR

Code: 400 BAD REQUEST
Content: { error : "bad request" }

### Sample Call:

BASE_URL/workouts/[user_id(int)]?month=[int]&year=[int]

## Get workout by ID: 

### Method: GET

### URL Params

Required: 
id=[int]

### Success Response:

Code: 200
Content: { 
  user_id,
  title,
  workout_start_time,
  workout_end_time,
  workout_date,
  exercises
 }

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR

Code: 400 BAD REQUEST
Content: { error : "bad request" }

### Sample Call:

BASE_URL/workouts/[user_id(int)]?workout_id=[int]

## Post workout: 

### Method: POST

### Request Body

Include workout object in body of request:
Ecample: 
newWorkout = {
  user_id,
  title,
  workout_start_time,
  workout_end_time,
  workout_date,
  exercises
 }

### Success Response:

Code: 201
Content: { 
  user_id,
  title,
  workout_start_time,
  workout_end_time,
  workout_date,
  exercises
 }

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR

Code: 400 BAD REQUEST
Content: { error : "Missing 'workout_date' in request body" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'title' in request body" }

### Sample Call:

BASE_URL/workouts/

## Patch/Update workout: 

### Method: PATCH

### URL Params

Required: 
workout_id=[int]

### Request Body

Include workout object with the info to be updated in body of request:
Ecample: 
infoToUpdate = {
  title,
  exercises
}

### Success Response:

Code: 204

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR

Code: 400 BAD REQUEST
Content: { error : "Request body must contain title, time, date or exercises" }


### Sample Call:

BASE_URL/workouts/?workout_id=[int]





