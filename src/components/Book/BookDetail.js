import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookDetail = () => {

    const id = useParams().id
    const history = useNavigate()

    const [input, setInput] = useState({})
    const [check, setCheck] = useState(false)

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/books/${id}`, {
            name: String(input.name),
            author: String(input.author),
            description: String(input.description),
            price: Number(input.price),
            image: String(input.image),
            available: Boolean(check)
        }).then((res) => res.data)
    }

    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`http://localhost:5000/books/${id}`).then((res) => res.data).then((data) => setInput(data.book))
        }
        fetchHandler()
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/books'))
        // console.log(input);
        // sendRequest().then(() => history('/books'))
    }

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            {input && (
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" justifyContent={'center'} maxWidth={700} alignContent={'center'} alignSelf="center" marginLeft={'auto'} marginRight={'auto'} marginTop={10}>
                        <FormLabel>Name</FormLabel>
                        <TextField value={input.name} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='name' />
                        <FormLabel>Author</FormLabel>
                        <TextField value={input.author} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='author' />
                        <FormLabel>Description</FormLabel>
                        <TextField value={input.description} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='description' />
                        <FormLabel>Price</FormLabel>
                        <TextField value={input.price} onChange={handleChange} type="number" margin='normal' fullWidth variant='outlined' name='price' />
                        <FormLabel>Image</FormLabel>
                        <TextField value={input.image} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='image' />
                        <FormControlLabel control={<Checkbox checked={check} onChange={() => setCheck(!check)} />} label="Available" />
                        <Button variant='contained' type='submit'>Update Book</Button>
                    </Box>
                </form>
            )}
        </div>
    )
}

export default BookDetail