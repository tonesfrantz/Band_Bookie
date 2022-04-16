import axios from 'axios';
import { useEffect, useState } from 'react';

export function Events() {
    const [events, setEvents] = useState<any>([]);
    useEffect(() => {
        axios
            .get('/api/events')
            .then((response: any) => response.data)
            .then((data: any) => {
                setEvents(data);
            });
    }, []);
    console.log(events);
    return (
        <>
            <h1>Events</h1>
            <div>
                {events &&
                    events.map((e: any) => (
                        // Make the output a Table
                        <p key={e.id}>
                            {e.name}
                            {e.date}
                        </p>
                    ))}
            </div>
        </>
    );
}
