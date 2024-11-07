import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CodeIcon from '@mui/icons-material/Code';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuizIcon from '@mui/icons-material/Quiz';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';

export default function AdminSideDrawer({ openDrawer, setOpenDrawer }) {

    const navigate = useNavigate()

    const menus = [
        { menu: 'Dashboard', icon: <SpeedOutlinedIcon />, route: '/pn/dashboard' },
        { menu: 'Courses', icon: <CodeIcon />, route: '/pn/courses' },
        { menu: 'Registrations', icon: <GroupAddIcon />, route: '/pn/student-registration' },
        { menu: 'Certificates', icon: <AdminPanelSettingsIcon />, route: '/pn/certificates' },
        { menu: 'Placements', icon: <VerifiedUserIcon />, route: '/pn/placements' },
        { menu: 'Interview Questions', icon: <QuizIcon />, route: '/pn/interview-questions' },
        { menu: 'Messages', icon: <MessageOutlinedIcon />, route: '/pn/messages' },
    ]

    const DrawerList = (
        <Box sx={{ width: 280, minHeight: '100vh' , background: 'rgb(67, 161, 255)', background: 'radial-gradient(circle, rgb(18 134 248) 35%, rgba(0, 90, 181, 1) 100%)' }} role="presentation" onClick={()=>setOpenDrawer(false)}>
            <List sx={{ textTransform: 'uppercase' }}>
                {menus?.map((val, index) => (
                    <ListItem key={index} onClick={()=>setTimeout(() => { navigate(val?.route) }, 300)} disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                {val?.icon}
                            </ListItemIcon>
                            <ListItemText sx={{ color: '#fff' }} primary={val?.menu} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#fff' }} primary="Sign out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}