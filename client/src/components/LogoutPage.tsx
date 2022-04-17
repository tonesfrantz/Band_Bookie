import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionType, ApplicationContext } from '../application-context';

export function LogoutPage() {
    const [appState, appAction] = useContext(ApplicationContext);
    const navigate = useNavigate();
    useEffect(() => {
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

        logout();
    }, []);
    useEffect(() => {
        if (appState.currentUser === null) {
            navigate('/');
        }
    }, [appState.currentUser]);

    return (
        <div>
            <p>Logging Out</p>
        </div>
    );
}
