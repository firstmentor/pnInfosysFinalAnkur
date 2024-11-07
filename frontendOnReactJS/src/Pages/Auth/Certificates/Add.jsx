/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { createCertificate, resetCertificateState } from '../../../Features/Certificate/CertificateSlice';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../Components/Modals/ErrorModal';

const AddCertificate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fields = {
        studentName: '',
        course: '',
        duration: '',
        studentImage: '',
    }

    const breadcrumbData = {
        currentPage: 'Add Certificate',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Certificates', route: '/pn/certificates' },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { certificates, responseStatus, responseMessage } = useSelector(state => state.certificates)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formdata = new FormData()
        formdata.append('studentName', data?.studentName)
        formdata.append('course', data?.course)
        formdata.append('duration', data?.duration)
        formdata.append('studentImage', data?.studentImage)

        dispatch(createCertificate(formdata))
    }

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Certificate created successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetCertificateState())
            }, 5000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                dispatch(resetCertificateState())
                navigate('/pn/certificates')
            }, 1000);
        }
    },[certificates, responseStatus, responseMessage])

    return (
        <>
            <AuthProtector />
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />
            <AdminHeader />

            <div className="w-100 bg-white admin-panel-body-margin-top">
                <Box sx={{ py: 1 }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                
                                <Breadcrumbs data={breadcrumbData} />

                                <Box sx={{ boxShadow: 3, mt: 2, p: 2 }}>
                                    <Typography color='error'>All Fields are mandatory.</Typography>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <form onSubmit={handleSubmit}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Student Name"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined" 
                                                    name='studentName'
                                                    onChange={handleInput}
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Name"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined" 
                                                    name='course'
                                                    onChange={handleInput} 
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Duration"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined" 
                                                    name='duration'
                                                    onChange={handleInput} 
                                                    fullWidth
                                                    required
                                                />
                                                <input 
                                                    type="file"
                                                    className='form-control form-control-lg mb-3' 
                                                    onChange={(e)=>setData({ ...data, studentImage: e.target.files[0] })} 
                                                />
                                                <Button type='submit' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<SaveIcon />}>Save</Button>
                                            </form>
                                        </div>
                                        <div className="col-md-5"></div>
                                    </div>
                                </Box>

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

export default AddCertificate