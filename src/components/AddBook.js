import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {


  const history = useNavigate()

  const [input, setInput] = useState({
    name:'',
    description: '',
    author: '',
    price: '',
    available: false,
    image: '',
  })

  const [ check, setCheck] = useState(false)

  const handleChange = (e) => {
     setInput((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
  }

  const sendRequest = async() => {
     axios.post("http://localhost:5000/books/", {
       name: String(input.name),
       author: String(input.author),
       description: String(input.description),
       price: Number(input.price),
       image: String(input.image),
       available: Boolean(check)
     }).then((res) => res.data)
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest().then(() => history('/books'))
  }

  return (
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
        <Button variant='contained' type='submit'>Add Book</Button>
      </Box>
    </form>
  )
}

export default AddBook