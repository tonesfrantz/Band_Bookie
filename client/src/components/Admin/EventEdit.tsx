import { Box, Button, TableContainer, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

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
                <Box sx={{ minWidth: 120 }}>
                    <TableContainer component={Paper}>
                        <Button
                            href='/admin/events'
                            color='error'
                            variant='contained'>
                            Back
                        </Button>
                        <TextField
                            helperText='Please edit name here'
                            id='event-edit-name'
                            onChange={(event: any) =>
                                setFieldValue('name', event.target.value)
                            }
                            value={event.name}
                        />
                        <TextField
                            helperText='Please edit date here'
                            id='event-edit-date'
                            onChange={(event: any) =>
                                setFieldValue('name', event.target.value)
                            }
                            value={event.date}
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
                </Box>
            </form>
        </>
    );
}
