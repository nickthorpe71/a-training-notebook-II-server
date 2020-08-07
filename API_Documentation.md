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





