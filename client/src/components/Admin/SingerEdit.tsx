import { ArrowDropDown } from '@mui/icons-material';
import { Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function SingerEdit() {
    const { id } = useParams();
    const [singer, setSinger] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/singers/${id}`)
            .then((response: any) => response.data)
            .then((data: any) => {
                setSinger(data);
            });
    }, []);
    console.log(singer);

    const setFieldValue = (field: string, value: any) => {
        setSinger({ ...singer, [field]: value });
    };

    const submitEditSinger = () => {
        axios
            .patch(`/api/singers/${id}`, {
                id: singer.id,
                profile_photo: singer.profile_photo,
                fullname: singer.fullname,
                instrument: singer.instrument,
            })
            .then(() => navigate('/admin/singers'))
            .catch(() => {
                alert('Something went wrong. Not Updated');
            });
    };
    const submitDeleteSinger = () => {
        axios
            .delete(`/api/singers/${id}`)
            .then(() => navigate('/admin/singers'))
            .catch(() => {
                alert('Something went wrong. Not Deleted');
            });
    };
    return (
        <>
            <h3>
                Singer No.{singer.id} {singer.fullname}.
            </h3>
            <form className='adminPage'>
                <Box sx={{ minWidth: 120 }}>
                    <TextField
                        helperText='Please edit profile photo URL here'
                        id='singer-edit-photo'
                        onChange={(event: any) =>
                            setFieldValue('profile_photo', event.target.value)
                        }
                        value={singer.profile_photo}
                    />
                    <TextField
                        helperText='Please edit full name here'
                        id='singer-edit-name'
                        onChange={(event: any) =>
                            setFieldValue('fullname', event.target.value)
                        }
                        value={singer.fullname}
                    />
                    <TextField
                        helperText='Please edit instrument here'
                        id='singer-edit-instrument'
                        onChange={(event: any) =>
                            setFieldValue('instrument', event.target.value)
                        }
                        value={singer.instrument}
                    />
                    <Button
                        onClick={submitEditSinger}
                        color='success'
                        variant='contained'>
                        Update
                    </Button>
                    <Button
                        onClick={submitDeleteSinger}
                        color='success'
                        variant='contained'>
                        Delete
                    </Button>
                </Box>
            </form>
        </>
    );
}
