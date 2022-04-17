import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../application-context';

export function UserTable() {
    const [appState, appAction] = useContext(ApplicationContext);
    const [userData, setUserData] = useState([
        {
            id: '',
            username: '',
            is_admin: false,
        },
    ]);
    useEffect(() => {
        const userTable = () => {
            axios
                .get('/api/users')
                .then((response: any) => response.data)
                .then((data: any) => {
                    setUserData({
                        id: userData.id,
                        username: userData.username,
                        is_admin: userData.is_admin,
                    });
                });
        };
        userTable();
    }, []);

    return (
        <div>
            <p>UserTable</p>
            {userData.map}
        </div>
    );
}
// const setFieldValue = (field: string, value: any) => {
//     setLoginFormData({ ...loginFormData, [field]: value });
// };
