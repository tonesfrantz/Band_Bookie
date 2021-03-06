import { Avatar, Box, Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { ApplicationContext } from '../../application-context';

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

export function EventsTable() {
    const [events, setEvents] = useState<any>([]);
    const [{ currentUser }, appAction] = useContext(ApplicationContext);
    useEffect(() => {
        axios
            .get('/api/events')
            .then((response: any) => response.data)
            .then((data: any) => {
                setEvents(data);
            });
    }, []);
    console.log(events);

    return (
        <>
            <h1>
                Events{' '}
                <Button color='success' variant='contained' href='/addevent'>
                    Add Event
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
                        <Link to='/admin/singers'>Back to Singers</Link>
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
                                    <StyledTableCell>Event ID</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Event Name
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Client Email
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Client Phone
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Band Size
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Singer ID
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Singer Name
                                    </StyledTableCell>
                                    <StyledTableCell align='right'></StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Date
                                    </StyledTableCell>
                                    {currentUser?.is_admin && (
                                        <>
                                            <StyledTableCell align='right'>
                                                Edit
                                            </StyledTableCell>
                                        </>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events &&
                                    events.map((e: any) => (
                                        <StyledTableRow key={e.id}>
                                            <StyledTableCell
                                                component='th'
                                                scope='row'>
                                                {e.id}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.name}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.email}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.phone}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.band_size}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.singer_id}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.singer_name}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Avatar
                                                    // alt='Remy Sharp'
                                                    src={e.singer_photo}
                                                    sx={{
                                                        width: 45,
                                                        height: 45,
                                                    }}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {moment(e.date).format(
                                                    'dddd Do, MMMM, yyyy'
                                                )}
                                            </StyledTableCell>
                                            {currentUser?.is_admin && (
                                                <>
                                                    <StyledTableCell align='right'>
                                                        <Button variant='outlined'>
                                                            <Link
                                                                to={`/admin/event/${e.id}`}>
                                                                Edit Event
                                                            </Link>
                                                        </Button>
                                                    </StyledTableCell>
                                                </>
                                            )}
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
