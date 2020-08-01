const express = require('express');
const path = require('path');
const WorkoutsService = require('./workouts-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bodyParser = express.json();

const workoutsRouter = express.Router();

workoutsRouter
  .route('/')
  .all(requireAuth)
  .post(bodyParser, (req, res, next) => {
    const {
      user_id,
      title,
      workout_start_time,
      workout_end_time,
      workout_date,
      notes,
      exercises
    } = req.body;

    //need to add time column to table
    const tempWorkout = {
      workout_date,
      title,
    };

    for (const [key, value] of Object.entries(tempWorkout))
      if (!value)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    const newWorkout = {
      ...tempWorkout,
      user_id,
      workout_start_time,
      workout_end_time,
      notes,
      exercises
    };

    WorkoutsService.addWorkout(req.app.get('db'), newWorkout)
      .then(workout => {

        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${workout.id}`))
          .json(workout); //need to add serialization

      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    //remember to change updated time on patch
    const {
      user_id,
      title,
      workout_start_time,
      workout_end_time,
      workout_date,
      notes,
      exercises
    } = req.body;

    const workoutToUpdate = {
      user_id,
      title,
      workout_start_time,
      workout_end_time,
      workout_date,
      notes,
      exercises
    };

    const numberOfValues = Object.values(workoutToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain title, notes, time, date or exercises'
        }
      });
    }

    WorkoutsService.updateWorkout(
      req.app.get('db'),
      req.query.workout_id,
      workoutToUpdate
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

workoutsRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    const { user_id } = req.params;

    //if workout_date
    if ('workout_date' in req.query) {
      const workout_date = req.query.workout_date;
      WorkoutsService.getworkoutsByUserAndDate(req.app.get('db'), user_id, workout_date)
        .then(res => {
          res
            .status(200)
            .json(res);
        })
        .catch(next);
    }

    //if month
    if ('month' in req.query) {
      const month = req.query.month;
      WorkoutsService.getWorkoutsByMonth(req.app.get('db'), month, user_id)
        .then(res => {
          res
            .status(200)
            .json(res);
        });
    }

    //if workout_id
    if ('workout_id' in req.query) {
      const workout_id = req.query.workout_id;

      WorkoutsService.getWorkoutById(req.app.get('db'), workout_id)
        .then(res => {
          res
            .status(200)
            .json(res);
        })
        .catch(next);
    }
  })
  .delete(bodyParser, (req, res, next) => {
    const { user_id, workout_id } = req.body;

    WorkoutsService.deleteWorkout(
      req.app.get('db'),
      user_id,
      workout_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = workoutsRouter;