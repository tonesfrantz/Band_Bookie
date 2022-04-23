import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../application-context';

export function AdminPage() {
    return (
        <div className='adminPage'>
            <Box sx={{ minWidth: 120 }}>
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
