import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export function EventsTable() {
    const [events, setEvents] = useState<any>([]);
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
            <h1>Events</h1>
            <div>
                <Box sx={{ minWidth: 120 }}>
                    <Button>
                        <Link to='/admin/'>Back to Admin</Link>
                    </Button>
                    <Button>
                        <Link to='/admin/users'>Back to Users</Link>
                    </Button>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 500 }}
                            aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Name
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Date
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Edit
                                    </StyledTableCell>
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
                                                {e.date}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                <Button>
                                                    <Link
                                                        to={`/admin/event/${e.id}`}>
                                                        Edit Event
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
