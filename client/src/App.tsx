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
            <ApplicationContext.Provider value={[appState, appAction]}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='events' element={<Events />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='logout' element={<LogoutPage />} />
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
