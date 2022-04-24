import { ArrowDropDown } from '@mui/icons-material';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    TableContainer,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

export function UserEdit() {
    const { id } = useParams();
    const [user, setUser] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/users/${id}`)
            .then((response: any) => response.data)
            .then((data: any) => {
                setUser(data);
            });
    }, []);
    console.log(user);

    const setFieldValue = (field: string, value: any) => {
        setUser({ ...user, [field]: value });
    };

    const submitEditUser = () => {
        axios
            .patch(`/api/users/${id}`, {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin,
            })
            .then(() => navigate('/admin/users'))
            .catch(() => {
                alert('Something went wrong. Not Updated');
            });
    };
    const submitDeleteUser = () => {
        axios
            .delete(`/api/users/${id}`)
            .then(() => navigate('/admin/users'))
            .catch(() => {
                alert('Something went wrong. Not Deleted');
            });
    };
    return (
        <>
            <h3>
                User No.{user.id} {user.username}.
            </h3>
            <form className='adminPage'>
                <Box sx={{ minWidth: 120 }}>
                    <TableContainer component={Paper}>
                        <Button
                            href='/admin/users'
                            color='error'
                            variant='contained'>
                            Back
                        </Button>
                        <TextField
                            helperText='Please edit username here'
                            id='user-edit-name'
                            onChange={(event: any) =>
                                setFieldValue('username', event.target.value)
                            }
                            value={user.username}
                        />
                        <InputLabel id='admin-drop-box'>
                            Admin YES/NO. Caution this can give user full access
                            to site
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={user.is_admin ? 1 : 0}
                            label='Is Admin'
                            onChange={(event: any) =>
                                setFieldValue('is_admin', event.target.value)
                            }>
                            <MenuItem value={1}>Yes - Full Access</MenuItem>
                            <MenuItem value={0}>No - Partial Access</MenuItem>
                        </Select>

                        <Button
                            onClick={submitEditUser}
                            color='success'
                            variant='contained'>
                            Update
                        </Button>
                        <Button
                            onClick={submitDeleteUser}
                            color='success'
                            variant='contained'>
                            Delete
                        </Button>
                    </TableContainer>
                </Box>
            </form>
        </>
    );
}
