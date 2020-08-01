BEGIN;

TRUNCATE
  users,
  workouts,
  exercises,
  sets
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, password)
VALUES
  ('dunder', 'dundermifflin@gmail.com', '$2a$12$z0u7H3yrQTbfxhv55C0JleoQFXK5uvZ2wqKUqqV3NsOBcfZ9B5NOW'),
  ('b.deboop', 'dodeepdeboop@gmail.com', '$2a$12$U6TplukfN6js3rmm90DwFuKzayxbQ/wKckLCqkFZoiqloPW/1UwWa'),
  ('c.bloggs', 'charliebloggs@gmail.com', '$2a$12$Aa7x/0x3XDU5XiqF7byj3eiFDD63jy5mmLWbh5tINvF/zWMktVPBW'),
  ('s.smith', 'samsmith@gmail.com', '$2a$12$dahEoDZZ21FV4Z3xBjw5Xeki1fVfWZIFmvdipXlS5/o5pRa2kbdtO'),
  ('lexlor', 'alextaylor@gmail.com', '$2a$12$JSCRiCJexxcp/a.R9.432OBiKMSTfthP27APem/cW3iXIota0GapC'),
  ('wippy', 'pingwonIn@gmail.com', '$2a$12$mWXM5jGoOla3qf0O/D4UL..swbYT3S/pK9hVOtJsu8e7j72rhMGuK');

INSERT INTO workouts (workout_date, title, user_id, notes)
VALUES
  ('2020-07-13', 'Strength', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-23', 'Calisthenics', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Run', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-28', 'Swim', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-29', 'Body Building', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-30', 'Martial Arts', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-22', 'Strength', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Calisthenics', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Run', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Swim', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Body Building', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
  ('2020-07-27', 'Martial Arts', 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ');

COMMIT;
