import { TextField } from '@mui/material';
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
export function AddEvent() {
    const [value, onChange] = useState(new Date());
    const [createEventData, setCreateEventData] = useState<any>({
        name: '',
        date: new Date(),
    });
    console.log(value);

    const setFieldValue = (field: string, value: any) => {
        setCreateEventData({ ...createEventData, [field]: value });
    };
    return (
        <div>
            <TextField
                helperText='Please enter your/event name'
                id='event-create-name'
                label='Name/Event Name'
                onChange={(event: any) =>
                    setFieldValue('name', event.target.value)
                }
                value={createEventData.name}
            />
            <DateTimePicker
                onChange={(value: any) => setFieldValue('date', value)}
                value={createEventData.date}
            />
        </div>
    );
}
