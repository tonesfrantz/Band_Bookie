import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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

export function SingersTable() {
    const [singers, setSingers] = useState<any>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('/api/singers')
            .then((response: any) => response.data)
            .then((data: any) => {
                setSingers(data);
            });
    }, []);
    console.log(singers.profile_photo);

    return (
        <>
            <h1>
                Singers{' '}
                <Button
                    color='success'
                    variant='contained'
                    href='/admin/singer/add'>
                    Add Singer
                </Button>
            </h1>

            <div className='adminPage'>
                <Box sx={{ minWidth: 120 }}>
                    <Button variant='outlined'>
                        <Link to='/admin/'>Back to Admin</Link>
                    </Button>
                    <Button variant='outlined'>
                        <Link to='/admin/users'>Back to Users</Link>
                    </Button>
                    <Button variant='outlined'>
                        <Link to='/admin/events'>Back to Events</Link>
                    </Button>
                    <TableContainer
                        sx={{
                            minWidth: 500,
                            border: '2px solid black',
                            width: '90%',
                            margin: '30px',
                        }}
                        component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Profile Photo
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Full Name
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Instrument
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Edit
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {singers &&
                                    singers.map((e: any) => (
                                        <StyledTableRow key={e.id}>
                                            <StyledTableCell
                                                component='th'
                                                scope='row'>
                                                {e.id}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                <img
                                                    height='60px'
                                                    width='70px'
                                                    src={e.profile_photo}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.fullname}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.instrument}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                <Button variant='outlined'>
                                                    <Link
                                                        to={`/admin/singer/${e.id}`}>
                                                        Edit Singer
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
