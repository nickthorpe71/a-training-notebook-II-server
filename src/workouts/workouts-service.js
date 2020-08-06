const xss = require('xss');

const WorkoutsService = {
  getworkoutsByUserAndDate(db, user_id, workout_date) {
    return db
      .select('*')
      .from('workouts')
      .where({
        user_id: user_id,
        workout_date: workout_date
      });
  },

  getWorkoutById(db, workout_id) {
    return db
      .select('*')
      .from('workouts')
      .where('id', workout_id);
  },

  getWorkoutsByMonth(db, month, year, user_id) {
    let maxDays = function (month, year) {
      return new Date(year, month, 0).getDate();
    };
    const from = `${year}-${month}-01`;
    const to = `${year}-${month}-${maxDays}`;
    return db
      .select('*')
      .from('workouts')
      .whereBetween('workout_date', [from, to])
      // .andWhereRaw('EXTRACT(MONTH FROM workout_date::date) = ?', [month])
      // .andWhereRaw('EXTRACT(YEAR FROM workout_date::date) = ?', [year])
      .where('user_id', user_id);
  },

  addWorkout(db, newWorkout) {
    return db
      .insert(newWorkout)
      .into('workouts')
      .returning('*')
      .then(([workout]) => workout);
  },

  deleteWorkout(db, user_id, workout_id) {
    return db
      .from('workouts')
      .where({
        user_id: user_id,
        id: workout_id
      })
      .delete();
  },

  updateWorkout(db, id, newFields) {
    return db('workouts')
      .where({ id })
      .update(newFields);
  },

  serializeWorkout(workout) {
    return {
      id: workout.id,
      workout_date: workout.workout_date,
      user_id: workout.user_id,
      title: xss(workout.title),
      workout_start_time: workout.workout_start_time,
      workout_end_time: workout.workout_end_time,
      exercises: xss(workout.exercises)
    };
  }
};

module.exports = WorkoutsService;