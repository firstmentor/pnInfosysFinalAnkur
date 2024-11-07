/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../../../Components/Modals/ErrorModal';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import { getAuthUser, resetAuthUserState, updateAuthUser, updateAuthUserPassword } from '../../../Features/AuthUser/AuthUserSlice';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const MyProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'My Profile',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

    const detailFields = {
        name: '',
        email: '',
        mobileNumber: '',
    }

    const passwordFields = {
        password: '',
        confirmPassword: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(detailFields)
    const [passwordData, setPasswordData] = useState(passwordFields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { authUsers, responseStatus, responseMessage } = useSelector(state => state.authUsers)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getAuthUser())
    }

    const handleUserDetailsUpdate = (e) => {
        e.preventDefault()

        setTimeout(() => {
            setIsLoading(true)
            dispatch(updateAuthUser(data))
        }, 300)
    }

    const handleUserPasswordUpdate = (e) => {
        e.preventDefault()

        setTimeout(() => {
            setIsLoading(true)
            dispatch(updateAuthUserPassword(passwordData))
        }, 300)
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            setData({ 
                ...data,
                name: authUsers?.data?.name,
                email: authUsers?.data?.email,
                mobileNumber: authUsers?.data?.mobileNumber,
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
        if(responseStatus == 'success' && responseMessage == 'Details updated successfully'){
            fetchData()
            alert(responseMessage)
            setTimeout(() => {
                dispatch(resetAuthUserState())
            }, 5000)
        }
        if(responseStatus == 'success' && responseMessage == 'Password changed successfully'){
            setPasswordData({
                password: '',
                confirmPassword: '',
            })
            alert(responseMessage)
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetAuthUserState())
            }, 5000)
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetAuthUserState())
            }, 1000);
        }
    },[authUsers, responseStatus, responseMessage])

    return (
        <>
            <AuthProtector />
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />
            <AdminHeader showBackButton={false} />

            <div className="w-100 bg-white admin-panel-body-margin-top">
                <Box sx={{ py: 1 }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                
                                <Breadcrumbs data={breadcrumbData} />

                                <div className="row mt-3">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6 mb-3">
                                        <center>
                                            <Avatar
                                                alt={data?.name || "Vikas Jain"}
                                                src="/static/images/avatar/1.jpg"
                                                sx={{ width: 80, height: 80, mb: 3 }}
                                            />
                                        </center>
                                        <form onSubmit={handleUserDetailsUpdate}>
                                            <TextField 
                                                id="name" 
                                                label="Name"
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                                name='name'
                                                value={data?.name}
                                                onChange={e => setData({ ...data, name: e.target.value })}
                                                fullWidth
                                                required
                                            />
                                            <TextField 
                                                id="email" 
                                                label="Email"
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                                name='email'
                                                value={data?.email}
                                                onChange={e => setData({ ...data, email: e.target.value })}
                                                fullWidth
                                                required
                                            />
                                            <TextField 
                                                id="mobileNumber" 
                                                label="Mobile Number"
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                                name='mobileNumber'
                                                value={data?.mobileNumber}
                                                onChange={e => setData({ ...data, mobileNumber: e.target.value })}
                                                fullWidth
                                                required
                                            />
                                            <Button type='submit' size='large' className='bg-gradient' fullWidth sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<SaveIcon />}>Update Details</Button>
                                        </form>
                                        <Typography sx={{ mt: 4, mb: 2, color: 'grey', fontWeight: 'bold' }}>Change Password:</Typography>
                                        <form onSubmit={handleUserPasswordUpdate}>
                                            <TextField 
                                                type={`${showPassword ? 'text' : 'password'}`}
                                                id="password" 
                                                label="New Password"
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                                name='password'
                                                value={passwordData?.password}
                                                onChange={e => setPasswordData({ ...passwordData, password: e.target.value })}
                                                fullWidth
                                                required
                                            />
                                            <TextField 
                                                type={`${showPassword ? 'text' : 'password'}`}
                                                id="confirmPassword" 
                                                label="Confirm Password"
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                                name='confirmPassword'
                                                value={passwordData?.confirmPassword}
                                                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
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
                                            <Button type='submit' size='large' className='bg-gradient' fullWidth sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<SaveIcon />}>Save</Button>
                                        </form>
                                    </div>
                                    <div className="col-md-3"></div>
                                </div>

                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </Box>
            </div>

            <MobileMenus />

            <SuccessModal open={showSuccess} setOpen={setShowSuccess} message={responseMessage} />
            <ErrorModal open={showError} setOpen={setShowError} message={responseMessage} />
        </>
    )
}

export default MyProfile