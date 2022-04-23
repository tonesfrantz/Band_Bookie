import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
export function AddSinger() {
    const navigate = useNavigate();
    const [createSingerData, setCreateSingerData] = useState<any>({
        profile_photo: '',
        fullname: '',
        instument: '',
    });
    console.log(createSingerData);

    const createsinger = () => {
        axios
            .post('/api/singers', {
                profile_photo: createSingerData.profile_photo,
                fullname: createSingerData.fullname,
                instrument: createSingerData.instrument,
            })
            .then(() => navigate('/admin/singers'));
    };

    const setFieldValue = (field: string, value: any) => {
        setCreateSingerData({ ...createSingerData, [field]: value });
    };
    return (
        <div>
            <TextField
                helperText='Please enter profile photo url here'
                id='singer-create-photo'
                label='photo'
                onChange={(event: any) =>
                    setFieldValue('profile_photo', event.target.value)
                }
                value={createSingerData.profile_photo}
            />
            <TextField
                helperText='Please enter full name here'
                id='singer-create-fullname'
                label='full name'
                onChange={(event: any) =>
                    setFieldValue('fullname', event.target.value)
                }
                value={createSingerData.fullname}
            />
            <TextField
                helperText='Please enter instrumenmt/s here'
                id='singer-create-instrument'
                label='instrument'
                onChange={(event: any) =>
                    setFieldValue('instrument', event.target.value)
                }
                value={createSingerData.instrumenmt}
            />

            <Button onClick={createsinger} color='success' variant='contained'>
                Create Singer Profile.
            </Button>
        </div>
    );
}
