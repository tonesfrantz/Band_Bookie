import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import './App.css';
import axios from 'axios';
import { Events } from './components/Events';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import {
    ActionType,
    ApplicationContext,
    ApplicationContextReducer,
    DefaultApplicationState,
} from './application-context';
import { NavBar } from './components/NavBar';
import { LogoutPage } from './components/LogoutPage';
import { Signup } from './components/Signup';
import { AdminPage } from './components/Admin/AdminPage';
import { UsersTable } from './components/Admin/UsersTable';
import { EventsTable } from './components/Admin/EventsTable';
import { EventEdit } from './components/Admin/EventEdit';
import { AddEvent } from './components/Customer/AddEvent';
import { UserEdit } from './components/Admin/UserEdit';

function App() {
    const [appState, appAction] = useReducer(
        ApplicationContextReducer,
        DefaultApplicationState
    );

    useEffect(() => {
        axios
            .get('/api/sessions')
            .then((response) => response.data)
            .then((data: any) => {
                if (data) {
                    appAction({
                        type: ActionType.LOGIN,
                        payload: {
                            user: data,
                        },
                    });
                }
            });
    }, []);

    return (
        <div className='App'>
            <h1>Band Bookie</h1>
            <ApplicationContext.Provider value={[appState, appAction]}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path='admin' element={<AdminPage />} />
                        <Route path='admin/event/:id' element={<EventEdit />} />
                        <Route path='admin/events' element={<EventsTable />} />
                        <Route path='admin/users' element={<UsersTable />} />
                        <Route path='admin/user/:id' element={<UserEdit />} />
                        <Route path='addevent' element={<AddEvent />} />
                        <Route path='events' element={<Events />} />
                        <Route path='/' element={<HomePage />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='logout' element={<LogoutPage />} />
                        <Route path='signup' element={<Signup />} />

                        <Route
                            path='*'
                            element={<p>Page not found! Oh NO!</p>}
                        />
                    </Routes>
                </BrowserRouter>
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
