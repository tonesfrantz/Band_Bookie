import { Box, Button, TableContainer, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import {
    ActionType,
    ApplicationContext,
    ApplicationContextReducer,
    DefaultApplicationState,
} from './../application-context';

let defaultErrors = {
    error_username: false,
    error_password: false,
};

export function LoginPage() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState<any>({
        username: '',
        password: '',
    });
    //Trying to have a front end Error Handlerto change color of button.
    const [errorHandler, setErrorhandle] = useState<any>(defaultErrors);
    useEffect(() => {
        if (appState.currentUser !== null) {
            navigate('/');
        }
    }, [appState.currentUser]);

    const login = () => {
        let hasError = false;
        let loginErrors = defaultErrors;
        if (loginFormData.username === '') {
            hasError = true;
            loginErrors.error_username = true;
        }
        if (loginFormData.password === '') {
            hasError = true;
            loginErrors.error_password = true;
        }

        if (!hasError) {
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
        } else {
            setErrorhandle(loginErrors);
        }
    };
    const setFieldValue = (field: string, value: any) => {
        setLoginFormData({ ...loginFormData, [field]: value });
    };

    //

    // useEffect(() => {

    // }, [
    //     loginFormData.username,
    //     loginFormData.password,
    //     loginFormData.password_confirmation,
    // ]);

    // console.log(errorHandler);
    // console.log(loginFormData);

    console.log(appState);

    return (
        <>
            <h3>Login Page</h3>
            {/* put helpertext in state for error handler. */}
            <TableContainer
                sx={{ width: '90%', margin: '30px' }}
                component={Paper}>
                <TextField
                    helperText='Please enter your name'
                    error={errorHandler.error_username} // The errorHandler State will make this false... The useEffect will tell you if it's false bn
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
                    error={errorHandler.error_password}
                    id='loginform-password'
                    onChange={(event: any) =>
                        setFieldValue('password', event.target.value)
                    }
                    label='Password'
                />

                <Button onClick={login} color='success' variant='contained'>
                    Login
                </Button>
            </TableContainer>
        </>
    );
}
