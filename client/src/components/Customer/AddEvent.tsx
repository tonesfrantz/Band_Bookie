import {
    Autocomplete,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TableContainer,
    TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
export function AddEvent() {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();
    const [selectedSinger, setSelectedSinger] = useState<any>(null);
    const [singers, setSingers] = useState<any>([]);
    const [createEventData, setCreateEventData] = useState<any>({
        singer_id: '',
        name: '',
        date: new Date(),
    });
    console.log(value);

    const signup = () => {
        axios
            .post('/api/events', {
                singer_id: 1, //createEventData.singer_id
                name: createEventData.name,
                date: createEventData.date,
            })
            .then(() => navigate('/events'));
    };

    useEffect(() => {
        const singerI = () => {
            axios
                .get('/api/singers')
                .then((response: any) => response.data)
                .then((data: any) => {
                    setSingers(data);
                });
        };

        singerI();
    }, []);

    console.log(setSingers);

    const setFieldValue = (field: string, value: any) => {
        setCreateEventData({ ...createEventData, [field]: value });
    };
    return (
        <div>
            <h1>Select Singer</h1>
            <TableContainer
                sx={{ width: '90%', margin: '30px' }}
                component={Paper}>
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={(singers ?? []).map((singer: any) => {
                        // console.log(singer);
                        return { label: singer.fullname, id: singer.id };
                    })}
                    onChange={(event: any, newValue: any) => {
                        console.log(newValue);
                        setFieldValue('singer_id', newValue.id);
                        setSelectedSinger(newValue);
                    }}
                    // sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label='Select Singer' />
                    )}
                    value={selectedSinger}
                />

                <TextField
                    helperText='Please enter your/event name'
                    id='event-create-name'
                    label='Name/Event Name'
                    onChange={(event: any) =>
                        setFieldValue('name', event.target.value)
                    }
                    value={createEventData.name}
                />
                <DatePicker
                    onChange={(value: any) => setFieldValue('date', value)}
                    value={createEventData.date}
                    renderInput={(params: any) => <TextField {...params} />}
                />

                <Button onClick={signup} color='success' variant='contained'>
                    Create Event.
                </Button>
            </TableContainer>
        </div>
    );
}
