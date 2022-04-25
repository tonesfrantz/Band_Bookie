import { Box, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../application-context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export function UsersTable() {
    const [appState, appAction] = useContext(ApplicationContext);
    const [userData, setUserData] = useState<any>([]);

    useEffect(() => {
        axios
            .get('/api/users')
            .then((response: any) => response.data)
            .then((data: any) => {
                setUserData(data);
            });
    }, []);

    return (
        <>
            <h1>
                Users
                <Button variant='contained' color='success'>
                    <Link to='/admin/users/add'>Create User</Link>
                </Button>
            </h1>
            <div className='adminPage'>
                <Box sx={{ minWidth: 120 }}>
                    <Button variant='outlined'>
                        <Link to='/admin/'>Back to Admin</Link>
                    </Button>
                    <Button variant='outlined'>
                        <Link to='/admin/events'>Back to Events</Link>
                    </Button>
                    <Button variant='outlined'>
                        <Link to='/admin/singers'>Back to Singers</Link>
                    </Button>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 500 }}
                            aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Username
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Is Admin
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Edit
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData &&
                                    userData.map((e: any) => (
                                        <StyledTableRow key={e.id}>
                                            <StyledTableCell
                                                component='th'
                                                scope='row'>
                                                {e.id}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.username}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.is_admin ? (
                                                    <Icon
                                                        sx={{
                                                            color: 'green',
                                                        }}>
                                                        done
                                                    </Icon>
                                                ) : (
                                                    <Icon
                                                        sx={{
                                                            color: 'red',
                                                        }}>
                                                        clear
                                                    </Icon>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                <Button variant='outlined'>
                                                    <Link
                                                        to={`/admin/user/${e.id}`}>
                                                        Edit User
                                                    </Link>
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </>
    );
}
