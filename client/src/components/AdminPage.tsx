import axios from 'axios';
import { useContext } from 'react';
import { ApplicationContext } from '../application-context';
import { UserTable } from './UserTable';

export function AdminPage() {
    return (
        <>
            <p>
                <UserTable />
            </p>
        </>
    );
}
