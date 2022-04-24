import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

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
import { url } from 'inspector';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { SingersTable } from './components/Admin/SingersTable';
import { SingerEdit } from './components/Admin/SingerEdit';
import { AddSinger } from './components/Admin/AddSinger';
import { SingerList } from './components/SingerList';
import { UserAdd } from './components/Admin/UserAdd';

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
            <div className='title_component'>
                <header className='App-header'>
                    <h1 className='App-title'>Band Bookie</h1>
                </header>
            </div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ApplicationContext.Provider value={[appState, appAction]}>
                    <BrowserRouter>
                        <NavBar />
                        <Routes>
                            <Route path='admin' element={<AdminPage />} />
                            <Route
                                path='admin/event/:id'
                                element={<EventEdit />}
                            />
                            <Route
                                path='admin/events'
                                element={<EventsTable />}
                            />
                            <Route
                                path='admin/users/add'
                                element={<UserAdd />}
                            />
                            <Route
                                path='admin/users'
                                element={<UsersTable />}
                            />
                            <Route
                                path='admin/user/:id'
                                element={<UserEdit />}
                            />
                            <Route
                                path='admin/singers'
                                element={<SingersTable />}
                            />
                            <Route
                                path='admin/singer/:id'
                                element={<SingerEdit />}
                            />
                            <Route
                                path='admin/singer/add'
                                element={<AddSinger />}
                            />
                            <Route path='addevent' element={<AddEvent />} />
                            <Route path='events' element={<Events />} />
                            <Route path='/' element={<HomePage />} />
                            <Route path='login' element={<LoginPage />} />
                            <Route path='logout' element={<LogoutPage />} />
                            <Route path='signup' element={<Signup />} />
                            <Route path='singerlist' element={<SingerList />} />

                            <Route
                                path='*'
                                element={<p>Page not found! Oh NO!</p>}
                            />
                        </Routes>
                    </BrowserRouter>
                </ApplicationContext.Provider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
