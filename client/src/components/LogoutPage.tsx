import { Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionType, ApplicationContext } from '../application-context';

export function LogoutPage() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!appState.currentUser) {
            navigate('/');
        }
    }, [appState.currentUser]);

    const logout = () => {
        axios
            .delete('/api/sessions', {})
            .then((response: any) => response.data)
            .then((data: any) => {
                appAction({
                    type: ActionType.LOGOUT,
                });
            });
    };
    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
