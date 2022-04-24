import { TableContainer } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../application-context';
import Paper from '@mui/material/Paper';

export function NavBar() {
    const [{ currentUser }, appAction] = useContext(ApplicationContext);
    return (
        <nav className='navbar'>
            <TableContainer
                sx={{ width: '90%', margin: '30px' }}
                component={Paper}>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/singerlist'>Artists/Singers</Link>
                    </li>
                    <li>
                        <Link to='/events'>Events</Link>
                    </li>
                    <li>
                        <Link to='/addevent'>Create Event</Link>
                    </li>
                    {currentUser == null && (
                        <>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup'>SignUp</Link>
                            </li>
                        </>
                    )}
                    {currentUser && (
                        <>
                            <li>
                                <Link to='/logout'>
                                    {currentUser.username} - Logout
                                </Link>
                            </li>
                        </>
                    )}
                    {currentUser?.is_admin && (
                        <>
                            <li>
                                <Link to='/admin'>Admin</Link>
                            </li>
                        </>
                    )}
                </ul>
            </TableContainer>
        </nav>
    );
}
