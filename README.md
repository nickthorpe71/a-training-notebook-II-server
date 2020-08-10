# A Training Notebook 

## Link to the live app
https://atrainingnotebook.vercel.app/

## API Documentation

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

## Post user: 

### Method: POST

### Request Body

newUser = {
  username: username,
  password: password,
  email: email
}

### Success Response:

Code: 201
Content: {
  username,
  password,
  email
}

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'username' in request body" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'password' in request body" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'email' in request body" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'username taken' in request body" }

### Sample Call:

BASE_URL/users


## Login Authorization: 

### Method: POST

### Request Body

newUser = {
  username: username,
  password: password,
}

### Success Response:

Code: 201
Content: {
  username,
  password,
}

### Error Response:

Code: 401 UNAUTHORIZED
Content: { error : "Unauthorized request" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'username' in request body" }

OR
Code: 400 BAD REQUEST
Content: { error : "Missing 'password' in request body" }

### Sample Call:

BASE_URL/auth/login

## Screenshots
![image](https://user-images.githubusercontent.com/57202558/89674122-39453480-d8ad-11ea-8387-14ad56d96fe7.png)
![image](https://user-images.githubusercontent.com/57202558/89674246-74476800-d8ad-11ea-884b-d35780b964ac.png)
![image](https://user-images.githubusercontent.com/57202558/89674871-7cec6e00-d8ae-11ea-827a-4a87784d9176.png)

## Summary
This project is called "a training notebook" because that is exactly what it is meant to supersede. Gym goers have carried notebooks or tracked their workouts on their phones for decades. In an effort to organize this ancient practice I have created a very simple and effective way to record and reacll your workouts.

## Tech
* React.js
* Node.js
* Express.js
* Server: Heroku
* Vercel
* Chai
* Nodemon
* Supertest
* Mocha
* Enzyme

## Contact
LinkedIn: https://www.linkedin.com/in/nick-thorpe-dev/

