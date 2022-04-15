DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS events;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    is_admin BOOLEAN NOT NULL default false,
);

CREATE TABLE events(
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
);

INSERT INTO
    users (username, password, is_admin)
VALUES
    (
        'tony',
        'band-bookie',
        true
    );

INSERT INTO
    events (name, date)
VALUES
    ('FredAngela', '2016-06-22 19:10:25-07');