/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import FullPageLoading from '../../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../../Components/Modals/ErrorModal';
import { createQuestionCourse, resetQuestionCourseState } from '../../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';

const AddInterviewQuestionCourse = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fields = {
        courseName: '',
    }

    const breadcrumbData = {
        currentPage: 'Add Interview Question Course',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Interview Question Courses', route: '/pn/interview-questions' },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { questionCourses, responseStatus, responseMessage } = useSelector(state => state.questionCourses)

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
            dispatch(createQuestionCourse(data))
        }, 300)
    }

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Question Course created successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetQuestionCourseState())
            }, 5000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                dispatch(resetQuestionCourseState())
                navigate('/pn/courses')
            }, 1000);
        }
    },[questionCourses, responseStatus, responseMessage])

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
                                                    sx={{ my: 2 }} 
                                                    variant="outlined"
                                                    name='courseName'
                                                    onChange={handleInput} 
                                                    fullWidth
                                                    required
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

export default AddInterviewQuestionCourse