import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../application-context';

export function NavBar() {
    const [{ currentUser }, appAction] = useContext(ApplicationContext);
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/events'>Events</Link>
                </li>
                {currentUser == null && (
                    <div>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>SignUp</Link>
                        </li>
                    </div>
                )}
                {currentUser && (
                    <div>
                        <li>
                            <Link to='/logout'>Logout</Link>
                        </li>
                        <li>
                            <Link to='/admin'>Admin</Link>
                        </li>
                    </div>
                )}
            </ul>
        </nav>
    );
}
