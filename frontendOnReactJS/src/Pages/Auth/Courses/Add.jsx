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
import { createCourse, resetCourseState } from '../../../Features/Course/CourseSlice';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../Components/Modals/ErrorModal';

const AddCourse = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fields = {
        courseName: '',
        duration: '',
        fees: '',
        courseBanner: '',
        startingDate: '',
    }

    const breadcrumbData = {
        currentPage: 'Add Course',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Courses', route: '/pn/courses' },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { courses, responseStatus, responseMessage } = useSelector(state => state.courses)

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
        formdata.append('courseName', data?.courseName)
        formdata.append('duration', data?.duration)
        formdata.append('fees', data?.fees)
        formdata.append('courseBanner', data?.courseBanner)
        formdata.append('startingDate', data?.startingDate)

        dispatch(createCourse(formdata))
    }

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Course created successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetCourseState())
            }, 5000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                dispatch(resetCourseState())
                navigate('/pn/courses')
            }, 1000);
        }
    },[courses, responseStatus, responseMessage])

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
                                        <div className="col-md-7">
                                            <form onSubmit={handleSubmit}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Name"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined"
                                                    name='courseName'
                                                    onChange={handleInput} 
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Duration"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined" 
                                                    name='duration'
                                                    onChange={handleInput} 
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    type='number'
                                                    id="outlined-basic" 
                                                    label="Course Fees"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined"
                                                    name='fees'
                                                    onChange={handleInput}  
                                                    fullWidth
                                                    required
                                                />
                                                <input 
                                                    type="file"
                                                    className='form-control form-control-lg'
                                                    onChange={(e)=>setData({ ...data, courseBanner: e.target.files[0] })} 
                                                />
                                                <TextField 
                                                    type='date'
                                                    id="outlined-basic" 
                                                    label="Starting Date"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined"
                                                    name='startingDate'
                                                    onChange={handleInput}  
                                                    fullWidth
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

export default AddCourse