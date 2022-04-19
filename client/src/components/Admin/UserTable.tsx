import { Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../application-context';

export function UserTable() {
    const [appState, appAction] = useContext(ApplicationContext);
    const [userData, setUserData] = useState<any>([]);
    useEffect(() => {
        const userTable = () => {
            axios
                .get('/api/users')
                .then((response: any) => response.data)
                .then((data: any) => {
                    setUserData(data);
                });
        };
        userTable();
    }, []);
    console.log(userData);
    return (
        <div>
            {/* <p>UserTable</p> */}
            {userData.map(
                // <COmpnonent data={user}/>
                (data: any) => (
                    <div key={data.id}>
                        <p>{data.username}</p>
                    </div>
                ) //Finish off the table and the data. Then edit abitlity etc.
                // Create component to edit the user. 1 component rendered several times.d
            )}
            <Button>
                <Link to='/admin/'>Back to Admin</Link>
            </Button>
        </div>
    );
}
// const setFieldValue = (field: string, value: any) => {
//     setLoginFormData({ ...loginFormData, [field]: value });
// };
