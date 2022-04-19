import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EventsEdit() {
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
            .then((response: any) => response.data)
            .then((data: any) => {
                setEvent(data);
            });
        navigate('/admin/events');
    };
    return (
        <>
            <h3>
                Event No.{event.id}; {event.name}.
            </h3>
            <form>
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
            </form>
        </>
    );
}
