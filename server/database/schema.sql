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
    phone INT,
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
    );

INSERT INTO
    events (name, email, phone, band_size singer_id, date)
VALUES
    (
        'FredAngela',
        'tony@gmail.com',
        0443333555,
        3,
        1,
        '2016-06-22'
    );

INSERT INTO
    singers (profile_photo, fullname, instrument)
VALUES
    (
        '/assets/images/BessyFemaleSinger.jpg',
        'Bessy Sue Allen',
        'Piano'
    );

{
/*-- 
 POST / api / users (signup / login) GET / api / artists ? instrument = Trumpet GET / api / artists ? is_lead = true POST / api / artists (admin only) { name: 'Test Event',
 email: 'joe@example.com',
 is_lead: true,
 instrument: null,
 preferred_artists: [1, 4, 6, 9],
 } POST / api / events (client / admin only) { name: 'Test Event',
 date: '2022-08-14 17:00:00',
 lead_artist_id: 1,
 band_size: 4,
 } users id SERIAL NOT NULL username VARCHAR(128) NOT NULL UNIQUE password VARCHAR(64) NOT NULL is_admin BOOLEAN NOT NULL default false;
 
 events id SERIAL NOT NULL name TEXT NOT NULL date TIMESTAMPTZ NOT NULL;
 
 lead_artist_id FOREIGN KEY (artists, id) NOT NULL band_size SMALLINT NOT_NULL artists id SERIAL NOT NULL email TEXT NOT NULL UNIQUE name TEXT NOT NULL is_lead BOOLEAN DEFAULT FALSE instrument VARCHAR(40);
 
 artist_preferred_musicians lead_artist_id FOREIGN KEY (artists, id) NOT NULL preferred_artist_id FOREIGN KEY (artists, id) NOT NULL event_artists event_id FOREIGN KEY (events, id) NOT NULL artist_id FOREIGN KEY (artists, id) NOT NULL status VARCHAR(10)