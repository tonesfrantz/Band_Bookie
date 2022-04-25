import { Button } from '@mui/material';
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
import { ApplicationContext } from '../application-context';

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
    const [{ currentUser }, appAction] = useContext(ApplicationContext);

    useEffect(() => {
        axios
            .get('/api/events')
            .then((response: any) => response.data)
            .then((data: any) => {
                setEvents(data);
            });
    }, []);
    // console.log(events);
    return (
        <>
            <h1>
                Upcoming Events:
                {currentUser?.is_admin && (
                    <>
                        <Button
                            color='success'
                            variant='contained'
                            href='/admin/events'>
                            Edit
                        </Button>
                    </>
                )}
            </h1>
            <div>
                <TableContainer
                    sx={{ width: '90%', margin: '30px' }}
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
                                            {moment(e.date).format(
                                                'dddd Do, MMMM, yyyy'
                                            )}
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
