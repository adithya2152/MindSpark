create table users (
    uid serial primary key,
    username text UNIQUE NOT NULL,
    email text NOT NULl,
    password text NOT NULL
)

CREATE TABLE quiz(
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    total_questions INTEGER NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(255) NOT NULL
);


create table participation (
    pid serial primary key ,
    quiz_id integer NOT NULL,
    user_id integer NOT NULL,
    max_score integer NOT NULl,
    user_score integer NOT NULL,
)