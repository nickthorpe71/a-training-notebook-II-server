BEGIN;

TRUNCATE
  users,
  workouts
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, password)
VALUES
  ('dunder', 'dundermifflin@gmail.com', '$2a$12$z0u7H3yrQTbfxhv55C0JleoQFXK5uvZ2wqKUqqV3NsOBcfZ9B5NOW'),
  ('b.deboop', 'dodeepdeboop@gmail.com', '$2a$12$U6TplukfN6js3rmm90DwFuKzayxbQ/wKckLCqkFZoiqloPW/1UwWa'),
  ('c.bloggs', 'charliebloggs@gmail.com', '$2a$12$Aa7x/0x3XDU5XiqF7byj3eiFDD63jy5mmLWbh5tINvF/zWMktVPBW'),
  ('s.smith', 'samsmith@gmail.com', '$2a$12$dahEoDZZ21FV4Z3xBjw5Xeki1fVfWZIFmvdipXlS5/o5pRa2kbdtO'),
  ('lexlor', 'alextaylor@gmail.com', '$2a$12$JSCRiCJexxcp/a.R9.432OBiKMSTfthP27APem/cW3iXIota0GapC'),
  ('wippy', 'pingwonIn@gmail.com', '$2a$12$mWXM5jGoOla3qf0O/D4UL..swbYT3S/pK9hVOtJsu8e7j72rhMGuK');

COMMIT;
