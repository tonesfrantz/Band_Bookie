import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
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
        name: '',
        email: '',
        phone: '',
        band_size: '',
        singer_id: '',
        date: new Date(),
    });
    console.log(createEventData);
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

    const emailMatch = (email: string, confirm_email: string) => {
        if (email === confirm_email) {
            return;
        }
        alert('emails do not match');
    };
    return (
        <div>
            <h1>Create your Event</h1>
            <p>
                Select a date, enter your details and choose a singer. Choose
                band size.
            </p>
            <TableContainer
                sx={{
                    width: '90%',
                    margin: '30px',
                    padding: '20px',
                }}
                component={Paper}>
                <DatePicker
                    onChange={(value: any) => setFieldValue('date', value)}
                    value={createEventData.date}
                    renderInput={(params: any) => <TextField {...params} />}
                />
                <TextField
                    id='event-create-name'
                    label='Name'
                    onChange={(event: any) =>
                        setFieldValue('name', event.target.value)
                    }
                    value={createEventData.name}
                />
                <TextField
                    id='event-create-email'
                    label='Email'
                    type='email'
                    onChange={(event: any) =>
                        setFieldValue('email', event.target.value)
                    }
                    value={createEventData.email}
                />
                <TextField
                    id='event-create-confirmemail'
                    label='Confirm Email'
                    type='email'
                    onChange={(event: any) =>
                        emailMatch(createEventData.email, event.target.value)
                    }
                    value={createEventData.email}
                />
                <TextField
                    id='event-create-phone'
                    label='Phone Number'
                    onChange={(event: any) =>
                        setFieldValue('phone', event.target.value)
                    }
                    value={createEventData.phone}
                />
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={(singers ?? []).map((singer: any) => {
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
                <FormControl>
                    <FormLabel id='demo-row-radio-buttons-group-label'>
                        Band Size
                    </FormLabel>
                    <RadioGroup
                        row
                        // name='row-radio-buttons-group'
                    >
                        <FormControlLabel
                            value='3'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='3'
                        />
                        <FormControlLabel
                            value='4'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='4'
                        />
                        <FormControlLabel
                            value='5'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='5'
                        />
                        <FormControlLabel
                            value='6'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='6'
                        />
                        <FormControlLabel
                            value='7'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='7'
                        />
                        <FormControlLabel
                            value='9'
                            control={<Radio />}
                            onChange={(event: any) => {
                                setFieldValue('band_size', event.target.value);
                            }}
                            label='9'
                        />
                    </RadioGroup>
                </FormControl>
                <Button onClick={signup} color='success' variant='contained'>
                    Create Event.
                </Button>
            </TableContainer>
        </div>
    );
}
