/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../Components/Modals/ErrorModal';
import { getCertificate, resetCertificateState, updateCertificate } from '../../../Features/Certificate/CertificateSlice';

const EditCertificate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: updateId } = useParams()

    const breadcrumbData = {
        currentPage: 'Edit Certificate',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Certificates', route: '/pn/certificates' },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [studentName, setStudentName] = useState('')
    const [course, setCourse] = useState('')
    const [duration, setDuration] = useState('')
    const [studentImage, setStudentImage] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { certificates, responseStatus, responseMessage } = useSelector(state => state.certificates)

    const fetchData = (id) => {
        setIsLoading(true)
        dispatch(getCertificate(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formdata = new FormData()
        formdata.append('id', updateId)
        formdata.append('studentName', studentName)
        formdata.append('course', course)
        formdata.append('duration', duration)
        formdata.append('studentImage', studentImage)

        dispatch(updateCertificate(formdata))
    }

    useEffect(()=>{
        if (updateId) {
            fetchData(updateId)
        }
    },[updateId])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Certificate updated successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetCertificateState())
            }, 5000);
        }
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            setStudentName(certificates?.data?.studentName)
            setCourse(certificates?.data?.course)
            setDuration(certificates?.data?.duration)
            setStudentImage(certificates?.data?.studentImageUrl)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
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
                                    <Typography color='error'>Fields with * are mandatory.</Typography>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <img src={studentImage} className='w-100 mt-3' alt={studentImage} />
                                        </div>
                                        <div className="col-md-7">
                                            <form onSubmit={handleSubmit}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Student Name"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined"
                                                    name='studentName'
                                                    value={studentName}
                                                    onChange={(e)=>setStudentName(e.target.value)} 
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined"
                                                    name='course'
                                                    value={course}
                                                    onChange={(e)=>setCourse(e.target.value)}  
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Duration"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined" 
                                                    name='duration'
                                                    value={duration}
                                                    onChange={(e)=>setDuration(e.target.value)} 
                                                    fullWidth
                                                    required
                                                />
                                                <input 
                                                    type="file"
                                                    className='form-control form-control-lg'
                                                    onChange={(e)=>setStudentImage(e.target.files[0])} 
                                                />
                                                <Button type='submit' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold', mt: 2 }} variant='contained' startIcon={<SaveIcon />}>Update</Button>
                                            </form>
                                        </div>
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

export default EditCertificate