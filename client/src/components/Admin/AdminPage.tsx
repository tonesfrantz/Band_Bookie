import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../application-context';
import Paper from '@mui/material/Paper';

export function AdminPage() {
    return (
        <div className='adminPage'>
            <Box sx={{ width: '90%', margin: '30px' }} component={Paper}>
                <li>
                    <Link to='/admin/users'>Users</Link>
                </li>
                <li>
                    <Link to='/admin/events'>Events</Link>
                </li>
                <li>
                    <Link to='/admin/singers'>Singers</Link>
                </li>
            </Box>
        </div>
    );
}
