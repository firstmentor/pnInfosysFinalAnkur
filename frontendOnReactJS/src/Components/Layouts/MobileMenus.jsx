import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AdminSideDrawer from './AdminSideDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { useLocation, useNavigate } from 'react-router-dom';


export default function MobileMenus() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = React.useState('');
  const ref = React.useRef(null);

  const [openDrawer, setOpenDrawer] = React.useState(false)

  React.useEffect(()=>{
    if (pathname == '/pn/dashboard') {
      setValue(1)
    }
    if (pathname == '/pn/messages') {
      setValue(2)
    }
    if (pathname == '/pn/my-profile') {
      setValue(3)
    }
  },[pathname])

  return (
    <>
      <div className='bottom-menus'>
        <Box sx={{ pb: 7 }} ref={ref}>
          <CssBaseline />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Menu" onClick={()=>setOpenDrawer(true)} icon={<MenuIcon />} />
              <BottomNavigationAction label="Dashboard" icon={<SpeedOutlinedIcon />} onClick={()=>{setTimeout(() => {navigate('/pn/dashboard')}, 300)}} />
              <BottomNavigationAction label="Messages" icon={<MessageOutlinedIcon />} onClick={()=>{setTimeout(() => {navigate('/pn/messages')}, 300)}} />
              <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} onClick={()=>{setTimeout(() => {navigate('/pn/my-profile')}, 300)}} />
            </BottomNavigation>
          </Paper>
        </Box>
      </div>

      <AdminSideDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
}