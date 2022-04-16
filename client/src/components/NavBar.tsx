import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../application-context';

export function NavBar() {
    const [{ currentUser }, appAction] = useContext(ApplicationContext);
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/events'>Events</Link>
                </li>
                {currentUser == null && (
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                )}
                {currentUser && (
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
