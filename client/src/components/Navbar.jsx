import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

export default function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Q-Blocks Notes Taker
            </Typography>
            <Button
              color="inherit"
              onClick={() =>
                window.open("https://www.linkedin.com/in/digitaldk/", "_blank")
              }
            >
              My Linkedin
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
