-- NOTE: 16777215 is highest number available to be generated --

-- pseudo_encrypt for survey id generation --

CREATE FUNCTION pseudo_encrypt_24(VALUE int) returns int AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
  l1:= (VALUE >> 12) & (4096-1);
  r1:= VALUE & (4096-1);
  WHILE i < 3 LOOP
    l2 := r1;
    r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * (4096-1))::int;
  l1 := l2;
  r1 := r2;
  i := i + 1;
  END LOOP;
  RETURN ((l1 << 12) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;


-- bounded_pseudo_encrypt for survey id generation --

CREATE FUNCTION bounded_pseudo_encrypt(VALUE int, MAX int, MIN int) returns int AS $$
BEGIN
  LOOP
    VALUE := pseudo_encrypt_24(VALUE);
    EXIT WHEN VALUE <= MAX AND VALUE >= MIN;
  END LOOP;
  RETURN VALUE;
END
$$ LANGUAGE plpgsql strict immutable;


-- how to use --

CREATE SEQUENCE user_id_seq START 100000;

CREATE SEQUENCE survey_id_seq START 100000;

CREATE SEQUENCE question_id_seq START 100000;

CREATE SEQUENCE answer_id_seq START 100000;

CREATE SEQUENCE response_id_seq START 100000;

CREATE SEQUENCE response_question_id_seq START 100000;

-- Example inserting into table schema...
-- survey_id int NOT NULL PRIMARY KEY SET DEFAULT bounded_pseudo_encrypt(nextval('survey_id_seq')::int, 999999, 100001)

-- Tests --

SELECT n, bounded_pseudo_encrypt(n, 999999, 100000) FROM generate_series(1,50) n;

SELECT bounded_pseudo_encrypt(1, 16777215, 2);
