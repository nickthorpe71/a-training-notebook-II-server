CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  workout_date DATE NOT NULL DEFAULT now(),
  workout_start_time TIME with time zone,
  workout_end_time TIME with time zone,
  title TEXT NOT NULL,
  exercises TEXT,
  notes TEXT,
  user_id INTEGER
    REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);