import React from 'react'
import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CodeIcon from '@mui/icons-material/Code';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import QuizIcon from '@mui/icons-material/Quiz';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { resetAuthState } from '../../Features/Auth/AuthSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AdminHeader = ({ showBackButton = true }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const menus = [
        { menu: 'Dashboard', icon: <SpeedOutlinedIcon />, route: 'dashboard' },
        { menu: 'Courses', icon: <CodeIcon />, route: 'courses' },
        { menu: 'Registrations', icon: <GroupAddIcon />, route: 'student-registration' },
        { menu: 'Certificates', icon: <AdminPanelSettingsIcon />, route: 'certificates' },
        { menu: 'Placements', icon: <VerifiedUserIcon />, route: 'placements' },
        { menu: 'Interview Questions', icon: <QuizIcon />, route: 'interview-questions' },
    ]

    const handleLogout = () => {
        Cookies.remove('pnInfosysAuthToken')
        dispatch(resetAuthState())
        setTimeout(() => {
            navigate('/')
        }, 300)
    }

    return (
        <>
            <div className='fixed-top'>
                <div className="w-100 bg-white">
                    <Box sx={{ boxShadow: 3, py: 1 }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                                        <div className='d-flex flex-wrap align-items-center gap-2'>
                                            {
                                                showBackButton ?
                                                    <div className='bottom-menus'>
                                                        <Tooltip title="Back" onClick={()=> setTimeout(() => { navigate(-1) }, 300)}>
                                                            <IconButton>
                                                                <ArrowBackIcon color='primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                : ''
                                            }
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', cursor: 'pointer' }} color='primary' onClick={()=>navigate('/')}>PN<span className='text-dark'>INFO</span>SYS</Typography>
                                            <div className='d-none-on-mobile'>
                                                <TextField 
                                                    type="search"
                                                    id="search" 
                                                    label="Search"
                                                    variant="outlined"
                                                    size='small'
                                                    name='search'
                                                    // value={loginData?.search}
                                                    // onChange={handleLoginInput}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton>
                                                                    <SearchIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center gap-2 d-none-on-mobile'>
                                            <Tooltip title="Messages" onClick={()=> setTimeout(() => { navigate(`/pn/messages`) }, 300)}>
                                                <IconButton>
                                                    <MessageOutlinedIcon color='primary' />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip sx={{ p: 0, m: 0 }} title="My Profile" onClick={()=> setTimeout(() => { navigate(`/pn/my-profile`) }, 300)}>
                                                <IconButton>
                                                    <Avatar alt="Vikas Jain" src="/static/images/avatar/1.jpg" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Sign out" onClick={handleLogout}>
                                                <IconButton>
                                                    <PowerSettingsNewIcon color='error' />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="w-100 bg-white mt-1 d-none-on-mobile">
                    <Box sx={{ boxShadow: 3, py: 1 }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className='d-flex flex-wrap align-items-center gap-3'>
                                        {
                                            menus?.map((val,key)=>(
                                                <Button key={key} type='button' variant='outlined' startIcon={val?.icon} onClick={()=> setTimeout(() => { navigate(`/pn/${val?.route}`) }, 300)}>{val?.menu}</Button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default AdminHeader