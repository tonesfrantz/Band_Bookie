import { Button } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../application-context';

export function AdminPage() {
    return (
        <div>
            <li>
                <Link to='/admin/users'>Users</Link>
            </li>
            <li>
                <Link to='/admin/events'>Events</Link>
            </li>
        </div>
    );
}
