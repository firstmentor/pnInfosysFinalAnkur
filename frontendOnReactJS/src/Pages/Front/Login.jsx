/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FullPageLoading from '../../Components/Loaders/FullPageLoader';
import GuestProtector from '../../Components/Authentication/GuestProtector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuthState, userLogin } from '../../Features/Auth/AuthSlice';
import SuccessModal from '../../Components/Modals/SuccessModal';
import ErrorModal from '../../Components/Modals/ErrorModal';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fields = {
        name: '',
        password: ''
    }

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { auth, loading, success, message, error } = useSelector(state => state.auth)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTimeout(() => {
            setIsLoading(true)
            dispatch(userLogin(data))
        }, 300);
    }

    useEffect(()=>{
        dispatch(resetAuthState())
    },[])

    useEffect(()=>{
        if (success && message == 'Logged In') {
            setData({
                email: '',
                password: '',
            })
            setTimeout(() => {
                navigate('/pn/dashboard')
            }, 1000);
        }
        if (success && message != '' && message != 'Logged In' && message != 'Registered Successfully') {
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
                dispatch(resetAuthState())
            }, 5000);
        }
        if (!success && message != '' && message != null) {
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
                dispatch(resetAuthState())
            }, 5000);
        }
    },[auth, loading, success, message, error])

    return (
        <>
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />

            <GuestProtector />

            <Box sx={{ minHeight: '100vh', width: '100%', backgroundImage: `url('/guestBg3.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-7 shadow-lg d-flex align-items-center justify-content-center" style={{ background: '#f0f2f7', minHeight: '100vh' }}>
                            <Box sx={{ boxShadow: 5, background: '#fff', p: 4 }}>
                                <Typography variant='h4' color='primary' sx={{ fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', mb: 1 }}>PN<span className='text-dark'>INFO</span>SYS</Typography>
                                <Typography variant='h6' color='error' sx={{ fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', mb: 1 }}>Admin Purpose only!</Typography>
                                <Typography variant='h5' sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>Login</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField 
                                        id="email" 
                                        label="Email"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        name='email'
                                        value={data?.email}
                                        onChange={handleInput}
                                        fullWidth
                                        required
                                    />
                                    <TextField 
                                        type={`${showPassword ? 'text' : 'password'}`}
                                        id="password" 
                                        label="Password"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        name='password'
                                        value={data?.password}
                                        onChange={handleInput}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={()=>setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        required
                                    />
                                    <Button type='submit' size='large' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' endIcon={<LockOpenIcon />}>Get Started</Button>
                                </form>
                            </Box>
                        </div>
                    </div>
                </div>
            </Box>

            <SuccessModal open={showSuccess} setOpen={setShowSuccess} message={message} />
            <ErrorModal open={showError} setOpen={setShowError} message={message} />
        </>
    )
}

export default Login