import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    ActionType,
    ApplicationContext,
    ApplicationContextReducer,
    DefaultApplicationState,
} from './../application-context';

export function LoginPage() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState<any>({
        username: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (appState.currentUser) {
            navigate('/');
        }
    }, [appState.currentUser]);

    const login = () => {
        axios
            .post('/api/sessions', {
                username: loginFormData.username,
                password: loginFormData.password,
            })
            .then((response: any) => response.data)
            .then((data: any) => {
                appAction({
                    type: ActionType.LOGIN,
                    payload: {
                        user: data,
                    },
                });
            });
    };
    const setFieldValue = (field: string, value: any) => {
        setLoginFormData({ ...loginFormData, [field]: value });
    };
    // console.log(loginFormData);
    // console.log(appState);
    return (
        <>
            <h1>LoginPage</h1>

            <TextField
                helperText='Please enter your name'
                id='loginform-name'
                label='Username'
                onChange={(event: any) =>
                    setFieldValue('username', event.target.value)
                }
                value={loginFormData.username}
            />
            <TextField
                type='password'
                helperText='Please enter password'
                id='loginform-password'
                onChange={(event: any) =>
                    setFieldValue('password', event.target.value)
                }
                label='Password'
            />
            <TextField
                type='password'
                helperText='Please re-enter your password'
                id='loginform-password_confirmation'
                onChange={(event: any) =>
                    setFieldValue('password_confirmation', event.target.value)
                }
                label='Password_Confirmation'
            />
            <Button onClick={login}>Click me</Button>
        </>
    );
}
