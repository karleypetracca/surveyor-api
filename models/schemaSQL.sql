-- schema --

CREATE TABLE authors
(
  id serial PRIMARY KEY,
  author varchar(100),
  email varchar(200)
);

CREATE TABLE posts
(
  id serial PRIMARY KEY,
  title varchar(200),
  post text,
  author_id int references authors(id)
);

CREATE TABLE comments
(
  id serial PRIMARY KEY,
  comment text,
  post_id int references authors(id),
  author_id int references authors(id)
);


-- template starters... --

INSERT INTO authors
  (author, email)
VALUES
  ('Bob Joe', 'bobjoe@aol.com');

INSERT INTO posts
  (title, post, author_id)
VALUES
  ('Welcome to my blog!', 'This place is pretty cool if you ask me. Stick around and you will see the next blogstar (or maybe even ALLstar!) rise before your very eyes.', 1);
  
INSERT INTO comments
  (comment, post_id, author_id)
VALUES
  ('Best blog post ever seen. Bravo!', 1, 1);
