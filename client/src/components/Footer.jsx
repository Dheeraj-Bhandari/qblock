import React from 'react'
import { Typography } from '@mui/material'
const Footer = () => {
  return (
    <Typography
    sx={{display:"flex", justifyContent : "center", alignItems : "center", height : "10vh"}}
    >Q-Blocks © {new Date().getFullYear()} All Right Reserved</Typography>
  )
}

export default Footer