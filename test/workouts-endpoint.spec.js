const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Workouts Endpoints', () => {
  let db;

  const {
    testUsers,
    testWorkouts,
  } = helpers.makeFixtures();
  const testUser = testUsers[0];
  const testWorkout = testWorkouts[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/workouts/', () => {
    beforeEach('insert data', () =>
      helpers.seedOtherTables(
        db,
        testWorkouts,
        testUsers
      )
    );
    it('Responds 201 and creates a workout', () => {
      const newWorkout = {
        id: 1,
        workout_date: '2020-04-27T00:00:00.000Z',
        title: 'Calisthenics2',
        user_id: testUser.id,
        workout_start_time: null,
        workout_end_time: null,
        exercises: 'some exercises'
      };

      return supertest(app)
        .post('/api/workouts/')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newWorkout)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.workout_date).to.eql(newWorkout.workout_date);
          expect(res.body.title).to.eql(newWorkout.title);
          expect(res.body.user_id).to.eql(newWorkout.user_id);
          expect(res.body.workout_start_time).to.eql(newWorkout.workout_start_time);
          expect(res.body.workout_end_time).to.eql(newWorkout.workout_end_time);
          expect(res.body.exercises).to.eql(newWorkout.exercises);
        });
    });
  });

  describe('PATCH /api/workouts/', () => {
    beforeEach('insert data', () =>
      helpers.seedOtherTables(
        db,
        testWorkouts,
        testUsers
      )
    );
    it('responds 204 and updates the workout', () => {
      const newWorkout = {
        id: 1,
        title: 'Calisthenics2',
        exercises: 'some exercises'
      };

      const idToUpdate = 1;

      const expectedWorkout = {
        ...testWorkouts[idToUpdate - 1],
        ...newWorkout
      };

      return supertest(app)
        .patch(`/api/workouts/?workout_id=${idToUpdate}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newWorkout)
        .expect(204)
        .then(res =>
          supertest(app)
            .get(`/api/workouts/${testUser.id}?workout_id=1`)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .then(res => {
              const responseWorkout = res.body[0];
              delete responseWorkout.created_at;
              delete responseWorkout.updated_at;

              expect(responseWorkout, expectedWorkout);
            })
        );
    });
    it('responds with 400 when no required fields supplied', () => {
      const idToUpdate = 1;
      return supertest(app)
        .patch(`/api/workouts/?workout_id=${idToUpdate}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({ irrelivantKey: 'goo' })
        .expect(400, {
          error: {
            message: 'Request body must contain title, time, date or exercises'
          }
        });
    });
  });

  describe('GET /api/workouts/:user_id', () => {
    beforeEach('insert data', () =>
      helpers.seedOtherTables(
        db,
        testWorkouts,
        testUsers
      )
    );
    it('responds 200 with workouts depending on date if date provided', () => {
      const userId = testUser.id;
      const date = testWorkout.workout_date;

      const expectedWorkouts = testWorkouts.filter(workout =>
        (workout.user_id === userId) && (workout.workout_date === date));

      return supertest(app)
        .get(`/api/workouts/${userId}?workout_date=${date}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, expectedWorkouts);

    });
    it('responds 200 with workouts depending on month if month and year are provided', () => {
      const userId = testUser.id;
      const month = String(testWorkout.workout_date).slice(5, 7).padStart(2, '0');
      const year = String(testWorkout.workout_date).slice(0, 4);

      return supertest(app)
        .get(`/api/workouts/${userId}?month=${month}&year=${year}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, testWorkouts);

    });
    it('responds 200 with the workout matching provided id', () => {
      const userId = testUser.id;
      const workoutId = testWorkout.id;

      const expectedWorkout = {
        ...testWorkout,
        updated_at: null
      };

      return supertest(app)
        .get(`/api/workouts/${userId}?workout_id=${workoutId}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .then(res => {
          const responseWorkout = res.body[0];
          delete responseWorkout.created_at;
          expect(responseWorkout, expectedWorkout);
        });
    });

  });

  describe('DELETE /api/workouts/:user_id', () => {
    beforeEach('insert data', () =>
      helpers.seedOtherTables(
        db,
        testWorkouts,
        testUsers
      )
    );
    it('Responds 204 when workout is deleted', () => {
      const user_id = testUser.id;
      const workoutToDelete = testWorkout;
      const expectedWorkouts = testWorkouts.filter(
        (workout) => workout.id !== workoutToDelete.id
      );

      return supertest(app)
        .delete(`/api/workouts/${user_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({ user_id: user_id, workout_id: workoutToDelete.id })
        .expect(204)
        .then((res) => {
          supertest(app)
            .get(`/api/workouts/${user_id}`)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(expectedWorkouts);
        });
    });
  });

});