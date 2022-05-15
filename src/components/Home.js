import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button LinkComponent={Link} to="/books" sx={{marginTop: 15}} variant="contained">
          <Typography sx={{ fontFamily: 'fantasy' }} variant="h2">All Products</Typography>
        </Button>
      </Box>
    </div>
  )
}

export default Home