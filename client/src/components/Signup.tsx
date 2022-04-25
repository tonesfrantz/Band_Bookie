import { Button, TableContainer, TextField } from '@mui/material';
import { Box } from '@mui/system';
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

export function Signup() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState<any>({
        username: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (appState.currentUser) {
            navigate('/');
        } else {
        }
    }, [appState.currentUser]);

    const signup = () => {
        if (signUpData.password === signUpData.password_confirmation) {
            axios
                .post('/api/users', {
                    username: signUpData.username,
                    password: signUpData.password,
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
            alert('Passwords do not match');
        }
    };
    const setFieldValue = (field: string, value: any) => {
        setSignUpData({ ...signUpData, [field]: value });
    };
    // console.log(loginFormData);
    // console.log(appState);
    return (
        <>
            <h3>Signup page</h3>
            <TableContainer
                sx={{ padding: '10px', width: '80%', margin: '30px auto' }}
                component={Paper}>
                <TextField
                    helperText='Please enter your username'
                    id='loginform-name'
                    label='Username'
                    onChange={(event: any) =>
                        setFieldValue('username', event.target.value)
                    }
                    value={signUpData.username}
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
                        setFieldValue(
                            'password_confirmation',
                            event.target.value
                        )
                    }
                    label='Password_Confirmation'
                />
                <Button onClick={signup} color='success' variant='contained'>
                    Sign-up
                </Button>
            </TableContainer>
        </>
    );
}
