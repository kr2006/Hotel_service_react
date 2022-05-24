import { React, useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Box, Container, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

const Rooms = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [data, setData] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        axios.get('https://localhost:44359/Rooms').then((response) => {
            setData(response.data);
        })
    }, [showEditForm, showCreateForm, data]);

    const deleteClienthandler = (roomId) => {
        const response = axios.delete(`https://localhost:44359/Rooms/${roomId}`).then(() => {

        });
    }

    const createFormHandler = () => {
        setShowCreateForm(!showCreateForm);
        setValue("roomNumber", "");
        setValue("roomFloor", "");
        setValue("roomCapacity", "");
        setValue("roomType", "");
        setValue("roomPrice", "");
    }

    const editFormHandler = (room) => {
        setShowEditForm(room.id);
        setValue("id", room.id);
        setValue("roomNumber", room.roomNumber);
        setValue("roomFloor", room.roomFloor);
        setValue("roomCapacity", room.roomCapacity);
        setValue("roomType", room.roomType);
        setValue("roomPrice", room.roomPrice);
    }

    const createClient = (data) => {
        console.log(data);
        axios.post('https://localhost:44359/Rooms', data).then(() => {
            setShowCreateForm(!showCreateForm);
        })
    }

    const updateClient = (data) => {
        console.log(data);
        axios.put(`https://localhost:44359/Rooms/`, data).then(() => {
            setShowEditForm(false);
        })
    }

    return (
        <Box sx={{ padding: '70px 10px' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", marginBottom: '20px' }}>
                    <button className='create-btn' onClick={createFormHandler}>
                        <AddIcon />
                    </button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="center">Number</TableCell>
                                <TableCell align="center">Floor</TableCell>
                                <TableCell align="center">Capacity</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {showCreateForm ? (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left"></TableCell>
                                <TableCell align="center"><TextField id="standard-basic" variant="standard" defaultValue="" {...register("roomNumber")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("roomFloor")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("roomCapacity")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("roomType")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("roomPrice")} /></TableCell>
                                <TableCell align="center"><button onClick={handleSubmit(createClient)}><CheckIcon /></button></TableCell>
                                <TableCell align="center"><button onClick={createFormHandler}><CloseIcon /></button></TableCell>
                            </TableRow>
                        ) : (<div></div>)}
                        <TableBody>
                            {data?.map((room => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{room.id === showEditForm ? (<TextField disabled id="standard-basic" variant="standard" defaultValue={room?.id} {...register("id")} />) : (room?.id)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={room.roomNumber} {...register("roomNumber")} />) : (room.roomNumber)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={room.roomFloor} {...register("roomFloor")} />) : (room.roomFloor)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={room.roomCapacity} {...register("roomCapacity")} />) : (room.roomCapacity)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={room.roomType} {...register("roomType")} />) : (room.roomType)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={room.roomPrice} {...register("roomPrice")} />) : (room.roomPrice)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<button onClick={handleSubmit(updateClient)}><CheckIcon /></button>) : (<button onClick={() => (editFormHandler(room))}><EditIcon /></button>)}</TableCell>
                                    <TableCell align="center">{room.id === showEditForm ? (<button onClick={() => (setShowEditForm(false))}><CloseIcon /></button>) : (<button onClick={() => deleteClienthandler(room.id)}><DeleteIcon /></button>)}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}

export default Rooms;