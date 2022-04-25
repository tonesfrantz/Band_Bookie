import { Box, Button, TableContainer, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers';

export function EventEdit() {
    const { id } = useParams();
    const [event, setEvent] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/events/${id}`)
            .then((response: any) => response.data)
            .then((data: any) => {
                setEvent(data);
            });
    }, []);
    // console.log({
    //     id: event.id,
    //     name: event.name,
    //     date: event.date,
    // });
    // console.log(event);
    const setFieldValue = (field: string, value: any) => {
        setEvent({ ...event, [field]: value });
    };
    // function submitToDatabase(e: any) {
    //     e.preventDefault();
    // }
    const submitEditEvent = () => {
        axios
            .patch(`/api/events/${id}`, {
                id: event.id,
                name: event.name,
                email: event.email,
                phone: event.phone,
                band_size: event.band_size,
                singer_id: event.singer_id,
                singer_name: event.singer_name,
                date: event.date,
            })
            .then(() => navigate('/admin/events'))
            .catch(() => {
                alert('Something went wrong. Not Updated!');
            });
    };
    const submitDeleteEvent = () => {
        axios
            .delete(`/api/events/${id}`)
            .then(() => navigate('/admin/events'))
            .catch(() => {
                alert('Something went wrong. Not Deleted');
            });
    };
    return (
        <>
            <h3>
                Event No.{event.id} {event.name}.
            </h3>
            <form>
                {/* <Box> */}
                <TableContainer
                    component={Paper}
                    sx={{ minWidth: 120, margin: '30px auto', width: '90%' }}>
                    <Button
                        href='/admin/events'
                        color='error'
                        variant='contained'>
                        Back
                    </Button>
                    <TextField
                        sx={{ width: '160px' }}
                        helperText='Please edit Name here'
                        id='event-edit-name'
                        onChange={(event: any) =>
                            setFieldValue('name', event.target.value)
                        }
                        value={event.name}
                    />
                    <TextField
                        sx={{ width: '160px' }}
                        helperText='Please edit Email here'
                        id='event-edit-email'
                        onChange={(event: any) =>
                            setFieldValue('email', event.target.value)
                        }
                        value={event.email}
                    />
                    <TextField
                        sx={{ width: '130px' }}
                        helperText='Please edit Phone here'
                        id='event-edit-phone'
                        onChange={(event: any) =>
                            setFieldValue('phone', event.target.value)
                        }
                        value={event.phone}
                    />
                    <TextField
                        sx={{ width: '50px' }}
                        helperText='Please edit Singer here'
                        id='event-edit-phone'
                        onChange={(event: any) =>
                            setFieldValue('singer_id', event.target.value)
                        }
                        value={event.singer_id}
                    />
                    <TextField
                        sx={{ width: '100px' }}
                        helperText='SingerName'
                        id='event-edit-phone'
                        // onChange={(event: any) =>
                        //     setFieldValue('singer_name', event.target.value)
                        // }
                        value={event.singer_name}
                    />
                    <TextField
                        sx={{ width: '50px' }}
                        helperText='Please edit Band-size here'
                        id='event-edit-band_size'
                        onChange={(event: any) =>
                            setFieldValue('band_size', event.target.value)
                        }
                        value={event.band_size}
                    />
                    <DatePicker
                        onChange={(value: any) => setFieldValue('date', value)}
                        value={event.date}
                        renderInput={(params: any) => <TextField {...params} />}
                    />

                    <Button
                        onClick={submitEditEvent}
                        color='success'
                        variant='contained'>
                        Update
                    </Button>
                    <Button
                        onClick={submitDeleteEvent}
                        color='success'
                        variant='contained'>
                        Delete
                    </Button>
                </TableContainer>
                {/* </Box> */}
            </form>
        </>
    );
}
