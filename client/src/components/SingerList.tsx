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

export function SingerList() {
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
            <div className='customerPage'>
                <Box sx={{ minWidth: 120 }}>
                    <TableContainer
                        sx={{ width: '90%', margin: '30px' }}
                        component={Paper}>
                        <Table
                            sx={{ minWidth: 500 }}
                            aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='left'>
                                        Profile Photo
                                    </StyledTableCell>
                                    <StyledTableCell align='left'>
                                        Full Name
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        Instrument
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {singers &&
                                    singers.map((e: any) => (
                                        <StyledTableRow key={e.id}>
                                            <StyledTableCell align='left'>
                                                <img
                                                    height='60px'
                                                    width='70px'
                                                    src={e.profile_photo}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align='left'>
                                                {e.fullname}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>
                                                {e.instrument}
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
