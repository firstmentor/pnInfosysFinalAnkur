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
import { getCourse, resetCourseState, updateCourse } from '../../../Features/Course/CourseSlice';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../Components/Modals/ErrorModal';

const EditCourse = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: updateId } = useParams()

    const breadcrumbData = {
        currentPage: 'Edit Course',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Courses', route: '/pn/courses' },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [courseName, setCourseName] = useState('')
    const [duration, setDuration] = useState('')
    const [fees, setFees] = useState('')
    const [courseBanner, setCourseBanner] = useState('')
    const [startingDate, setStartingDate] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { courses, responseStatus, responseMessage } = useSelector(state => state.courses)

    const fetchData = (id) => {
        setIsLoading(true)
        dispatch(getCourse(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formdata = new FormData()
        formdata.append('id', updateId)
        formdata.append('courseName', courseName)
        formdata.append('duration', duration)
        formdata.append('fees', fees)
        formdata.append('courseBanner', courseBanner)
        formdata.append('startingDate', startingDate)

        dispatch(updateCourse(formdata))
    }

    useEffect(()=>{
        if (updateId) {
            fetchData(updateId)
        }
    },[updateId])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Course updated successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetCourseState())
            }, 5000);
        }
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            setCourseName(courses?.data?.courseName)
            setDuration(courses?.data?.duration)
            setFees(courses?.data?.fees)
            setCourseBanner(courses?.data?.courseBannerUrl)
            setStartingDate(courses?.data?.startingDate)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
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
                                        <div className="col-md-5">
                                            <img src={courseBanner} className='w-100 mt-3' alt={courseBanner} />
                                        </div>
                                        <div className="col-md-7">
                                            <form onSubmit={handleSubmit}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Name"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined"
                                                    name='courseName'
                                                    value={courseName}
                                                    onChange={(e)=>setCourseName(e.target.value)} 
                                                    fullWidth
                                                    required
                                                />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Course Duration"
                                                    sx={{ mt: 2 }} 
                                                    variant="outlined" 
                                                    name='duration'
                                                    value={duration}
                                                    onChange={(e)=>setDuration(e.target.value)} 
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
                                                    value={fees}
                                                    onChange={(e)=>setFees(e.target.value)}  
                                                    fullWidth
                                                    required
                                                />
                                                <input 
                                                    type="file"
                                                    className='form-control form-control-lg'
                                                    onChange={(e)=>setCourseBanner(e.target.files[0])} 
                                                />
                                                <TextField 
                                                    type='date'
                                                    id="outlined-basic" 
                                                    label="Starting Date"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined"
                                                    name='startingDate'
                                                    value={startingDate}
                                                    onChange={(e)=>setStartingDate(e.target.value)}  
                                                    fullWidth
                                                />
                                                <Button type='submit' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<SaveIcon />}>Update</Button>
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

export default EditCourse