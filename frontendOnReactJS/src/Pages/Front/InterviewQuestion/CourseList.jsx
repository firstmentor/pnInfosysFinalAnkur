/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionCourses, resetQuestionCourseState } from '../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';

const CourseListForInterviewQuestion = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])

    const { questionCourses, responseStatus, responseMessage } = useSelector(state => state.questionCourses)

    const fetchList = () => {
        setIsLoading(true)
        dispatch(getQuestionCourses())
    }

    useEffect(()=>{
        fetchList()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(questionCourses?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetQuestionCourseState())
            }, 1000);
        }
    },[questionCourses, responseStatus, responseMessage])

    return (
        <>
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />
            <Navbar />

            <div className="container-fluid" style={{ background: 'rgb(67 161 255)', background: 'linear-gradient(90deg, rgb(67 161 255 / 25%) 35%, rgb(0 90 181 / 0%) 100%)' }}>
                <div className='py-5'>
                    <div className="row py-5">
                        <div className="col-md-12">
                            <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                                <div className='w-100'>
                                    <div className="row mt-4">
                                        <div className="col-md-5 d-flex align-items-start justify-content-center px-5" style={{ background: 'rgb(25 118 210 / 87%)' }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 5, mb: 4 }} color='white'><i className="fa-solid fa-code"></i> Related Courses for Interview Questions</Typography>
                                        </div>
                                        <div className="col-md-7">
                                            <Box sx={{ boxShadow: 3, background: '#fff', px: 2, pb: 2 }}>
                                                <div className="row">
                                                    {
                                                        Array?.isArray(list) && list?.length > 0 ?
                                                            Array?.isArray(list) && list?.map((val,key)=>(
                                                                <div key={key} className={`col-md-4 ${val?.isDeleted == 1 ? 'd-none' : ''}`}>
                                                                    <Button sx={{ boxShadow: 3, mt: 2, flexDirection: 'column' }} fullWidth onClick={()=>{ setTimeout(() => { navigate(`/interview-question/${val?.interview_question_course_id}`) }, 300) }}>
                                                                        <Box sx={{ width: '100%' }}>
                                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '15px', mt: 1 }}>{val?.courseName}</Typography>
                                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', mt: 1, color: 'grey' }}>Show Questions</Typography>
                                                                        </Box>
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        :
                                                            <div className="col-md-12">
                                                                <center><Typography sx={{ fontWeight: 'bold', fontSize: '15px', mt: 2 }}>No Course Added Yet</Typography></center>
                                                            </div>
                                                    }
                                                </div>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default CourseListForInterviewQuestion