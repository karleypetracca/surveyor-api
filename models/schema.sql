-- schema --

CREATE TABLE users
(
  user_id int NOT NULL PRIMARY KEY DEFAULT bounded_pseudo_encrypt(nextval('user_id_seq')::int, 999999, 100001),
  first_name varchar(200) NOT NULL,
  last_name varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  username varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  created_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE user_id_seq
OWNED BY users.user_id;


CREATE TABLE survey_types
(
  type_id serial PRIMARY KEY,
  type_name text NOT NULL
);


CREATE TABLE question_types
(
  type_id serial PRIMARY KEY,
  type_name text NOT NULL
);


CREATE TABLE surveys
(
  survey_id int NOT NULL PRIMARY KEY DEFAULT bounded_pseudo_encrypt(nextval('survey_id_seq')::int, 999999, 100001),
  name varchar(255) NOT NULL,
  survey_type_id int NOT NULL references survey_types(type_id),
  user_id int references users(user_id),
  created_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE survey_id_seq
OWNED BY surveys.survey_id;


CREATE TABLE questions
(
  question_id int NOT NULL PRIMARY KEY DEFAULT bounded_pseudo_encrypt(nextval('question_id_seq')::int, 999999, 100001),
  text varchar(255) NOT NULL,
  survey_id int NOT NULL references surveys(survey_id),
  question_type_id int NOT NULL references question_types(type_id),
  question_order int NOT NULL,
  option_1 varchar(255),
  option_2 varchar(255),
  option_3 varchar(255),
  option_4 varchar(255),
  option_5 varchar(255),
  option_6 varchar(255),
  other text,
  img_url text
);
ALTER SEQUENCE question_id_seq
OWNED BY questions.question_id;


CREATE TABLE responses
(
  response_id int NOT NULL PRIMARY KEY DEFAULT bounded_pseudo_encrypt(nextval('question_id_seq')::int, 999999, 100001),
  survey_id int NOT NULL references surveys(survey_id),
  submitted_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE response_id_seq
OWNED BY responses.response_id;


CREATE TABLE response_questions
(
  response_question_id int NOT NULL PRIMARY KEY DEFAULT bounded_pseudo_encrypt(nextval('question_id_seq')::int, 999999, 100001),
  response_id int NOT NULL references responses(response_id),
  question_id int NOT NULL references questions(question_id),
  option_1 boolean,
  option_2 boolean,
  option_3 boolean,
  option_4 boolean,
  option_5 boolean,
  option_6 boolean,
  other text
);
ALTER SEQUENCE response_question_id_seq
OWNED BY response_questions.response_question_id;



-- must inserts for starters --

INSERT INTO survey_types (type_name) VALUES ('survey') , ('snap');

INSERT INTO question_types (type_name) VALUES ('boolean'), ('single choice'), ('multiple choice'), ('open text'), ('image only');

INSERT INTO users
  (user_id, first_name, last_name, email, username, password)
VALUES
  (0, 'snap', 'survey', 'snapsurvey@snapsurvey.com', 'snapsurvey', 1234);


-- template starters... --

INSERT INTO users
  (first_name, last_name, email, username, password)
VALUES
  ('Quiz', 'Wizard', 'quizwizard@gmail.com', 'quizwizard', 1234);

INSERT INTO surveys
  (name, survey_type_id, user_id)
VALUES
  ('2020 Corona Quiz (from the Quiz Wiz)', 1, 344933);

INSERT INTO questions
  (text, survey_id, question_type_id, question_order, option_1, option_2, img_url)
VALUES
  ('How are your toilet paper reserves holding up?', 492338, 2, 1, 'Not great', 'I can outlast this thing', 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/B613/production/_106111664_gettyimages-157681994.jpg');

INSERT INTO responses
  (survey_id)
VALUES
  (492338);

INSERT INTO response_questions
  (response_id, question_id, option_1, option_2, option_3, option_4, option_5, option_6, other)
VALUES
  (661747, 380263, false, true, false, false, false, false, "");