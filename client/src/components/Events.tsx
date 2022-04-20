import { Button } from '@mui/material';
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

export function Events() {
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
                <TableContainer
                    sx={{ padding: 10, width: '80%' }}
                    component={Paper}>
                    <Table aria-label='customized table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='left'>
                                    Name
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    Date
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events &&
                                events.map((e: any) => (
                                    <StyledTableRow key={e.id}>
                                        <StyledTableCell align='left'>
                                            {e.name}
                                        </StyledTableCell>
                                        <StyledTableCell align='right'>
                                            {e.date}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
