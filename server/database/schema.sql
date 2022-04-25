DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS events;

DROP TABLE IF EXISTS singers;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    is_admin BOOLEAN NOT NULL default false
);

CREATE TABLE events(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    phone TEXT,
    band_size INT NOT NULL,
    singer_id INT NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE singers(
    id SERIAL PRIMARY KEY NOT NULL,
    profile_photo TEXT,
    fullname VARCHAR(128) NOT NULL UNIQUE,
    instrument VARCHAR(64) NOT NULL
);

INSERT INTO
    users (username, password, is_admin)
VALUES
    (
        'Tony',
        '$2b$10$yC5pTnskmmvbs/0hCPT3oONv3/fhCoM0utZoj0gJh9OhFzzk.S2B2',
        true
    ),
    (
        'Gareth',
        '$2b$10$yC5pTnskmmvbs/0hCPT3oONv3/fhCoM0utZoj0gJh9OhFzzk.S2B2',
        false
    );

INSERT INTO
    events (name, email, phone, band_size, singer_id, date)
VALUES
    (
        'Fred Angela',
        'tony@gmail.com',
        '0443333555',
        3,
        1,
        '2016-06-22'
    ),
    (
        'Juan & Silvana',
        'tonyf@gmail.com',
        '04000000',
        7,
        1,
        '2023-11-24'
    );

INSERT INTO
    singers (profile_photo, fullname, instrument)
VALUES
    (
        '/assets/images/BessyFemaleSinger.jpg',
        'Bessy Sue Allen',
        'Piano'
    ),
    (
        '/assets/images/Mariachi.jpg',
        'Gonzalez',
        'Guitar'
    ),
    (
        '/assets/images/Male_singer.jpg',
        'Jim Whau',
        'Guitar'
    );