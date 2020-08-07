const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      email: 'test@gmail.com',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      username: 'test-user-2',
      email: 'test@gmail.com',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      username: 'test-user-3',
      email: 'test@gmail.com',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      username: 'test-user-4',
      email: 'test@gmail.com',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeWorkoutsArray(users) {
  return [
    {
      id: 1,
      workout_date: '2020-07-27T00:00:00.000Z',
      title: 'Calisthenics',
      user_id: users[0].id,
      workout_start_time: null,
      workout_end_time: null,
      exercises: 'some exercises'
    },
    {
      id: 2,
      workout_date: '2020-07-27T00:00:00.000Z',
      title: 'Strength',
      user_id: users[0].id,
      workout_start_time: null,
      workout_end_time: null,
      exercises: 'some exercises'
    },
    {
      id: 3,
      workout_date: '2020-07-27T00:00:00.000Z',
      title: 'Run',
      user_id: users[0].id,
      workout_start_time: null,
      workout_end_time: null,
      exercises: 'some exercises'
    },
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testWorkouts = makeWorkoutsArray(testUsers);

  return { testUsers, testWorkouts };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      workouts
      RESTART IDENTITY CASCADE`
  );
}

function seedUsersTable(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into('users')
    .insert(preppedUsers)
    .then(() =>
      db.raw('SELECT setval(\'users_id_seq\', ?)', [
        users[users.length - 1].id,
      ])
    );
}

function seedOtherTables(db, workouts, users) {
  return db.transaction(async (trx) => {
    await seedUsersTable(trx, users);
    await trx.into('workouts').insert(workouts);
    await trx.raw('SELECT setval(\'workouts_id_seq\', ?)', [
      workouts[workouts.length - 1].id,
    ]);
  });
}

function seedMaliciousSpiirt(db, users, workouts) {
  return seedUsersTable(db, users).then(() =>
    db.into('spirits').insert(workouts)
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}


module.exports = {
  makeUsersArray,
  makeWorkoutsArray,

  makeFixtures,
  cleanTables,
  seedUsersTable,
  seedOtherTables,
  seedMaliciousSpiirt,
  makeAuthHeader,
};
