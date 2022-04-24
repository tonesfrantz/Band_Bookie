import {
    Button,
    MenuItem,
    Select,
    TableContainer,
    TextField,
} from '@mui/material';
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
} from '../../application-context';

export function UserAdd() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState<any>({
        username: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
    });

    useEffect(() => {
        if (appState.currentUser?.is_admin) {
            navigate('/admin/users/add');
        } else {
            alert('You are not Admin - can not add users');
            navigate('/');
        }
    }, [appState.currentUser]);
    // console.log(appState.currentUser);
    const signup = () => {
        if (signUpData.password === signUpData.password_confirmation) {
            axios
                .post('/api/users', {
                    username: signUpData.username,
                    password: signUpData.password,
                    is_admin: signUpData.is_admin,
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
                sx={{ padding: 10, width: '80%', margin: '30px' }}
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
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={signUpData.is_admin ? 1 : 0}
                    label='Is Admin'
                    onChange={(event: any) =>
                        setFieldValue('is_admin', event.target.value)
                    }>
                    <MenuItem value={1}>Yes - Full Access</MenuItem>
                    <MenuItem value={0}>No - Partial Access</MenuItem>
                </Select>
                <Button onClick={signup} color='success' variant='contained'>
                    Sign-up
                </Button>
            </TableContainer>
        </>
    );
}
