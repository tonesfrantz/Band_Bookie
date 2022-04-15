# BandBookie

Project 4

## Band Booking System for Easy events

# Available on Heroku:

Available on Heroku [here](https://hidden-chamber-28437.herokuapp.com)

# The project:

-- Create a website where clients can book a band simply. The band agents can quickly and easily make the line up through a tree system of booking.

-- The client books their preferred singer and band size/instrumentation. The singer has their list of preferred musicians in order of prefereance and then
the system outputs singer and band members.

-- This process takes all the time consuming effort out of booking a band.

# Deliverables of the project:

# Planning:

-- Wireframe of layout:
https://github.com/tonesfrantz/Band_Bookie/blob/main/BandBookiewireframing.png

--Wireframe of Database:
/Users/anthonyfrantz/sei/project4/Band_Bookie/dataBaseWireframe.png

-- DATABASE Planning:

POST /api/users (signup / login)
GET /api/artists?instrument=Trumpet
GET /api/artists?is_lead=true
POST /api/artists (admin only)
{
name: 'Test Event',
email: 'joe@example.com',
is_lead: true,
instrument: null,
preferred_artists: [1, 4, 6, 9],
}
POST /api/events (client/admin only)
{
name: 'Test Event',
date: '2022-08-14 17:00:00',
lead_artist_id: 1,
band_size: 4,
}
users
id SERIAL NOT NULL
username VARCHAR(128) NOT NULL UNIQUE
password VARCHAR(64) NOT NULL
is_admin BOOLEAN NOT NULL default false

events
id SERIAL NOT NULL
name TEXT NOT NULL
date TIMESTAMPTZ NOT NULL
lead_artist_id FOREIGN KEY (artists, id) NOT NULL
band_size SMALLINT NOT_NULL

artists
id SERIAL NOT NULL
email TEXT NOT NULL UNIQUE
name TEXT NOT NULL
is_lead BOOLEAN DEFAULT FALSE
instrument VARCHAR(40)

artist_preferred_musicians
lead_artist_id FOREIGN KEY (artists, id) NOT NULL
preferred_artist_id FOREIGN KEY (artists, id) NOT NULL

event_artists
event_id FOREIGN KEY (events, id) NOT NULL
artist_id FOREIGN KEY (artists, id) NOT NULL
status VARCHAR(10)
