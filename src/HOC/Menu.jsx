import React from "react";
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import Box from '@mui/material/Box';

const withMenu = (OriginalComponent) => {
  function NewComponent(props) {
    return (<>
      <NavBar />
      <Box sx={{ display: 'flex', backgroundColor: '#f7f7f7' }}>
        <SideNav />
        <Box component='main' sx={{ flexGrow: 1, pt: 12, pl: 20, maxWidth: '102rem', minHeight: "100vh" }}>
              <OriginalComponent />
        </Box>
      </Box>
    </>
    )
  }
  return NewComponent;
}

export default withMenu;