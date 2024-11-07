/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, resetCourseState } from '../../../Features/Course/CourseSlice'
import FullPageLoading from '../../../Components/Loaders/FullPageLoader'

const Courses = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [currentDate, setCurrentDate] = useState("");

    const { courses, responseStatus, responseMessage } = useSelector(state => state.courses)

    const fetchList = () => {
        setIsLoading(true)
        dispatch(getCourses())
    }

    const formattedDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    }

    useEffect(()=>{
        const today = new Date();
        const formattedDate =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        setCurrentDate(formattedDate)

        fetchList()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(courses?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetCourseState())
            }, 1000);
        }
    },[courses, responseStatus, responseMessage])

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
                                        <div className="col-md-5 d-flex align-items-start justify-content-center" style={{ background: 'rgb(25 118 210 / 87%)' }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 5, mb: 4 }} color='white'><i className="fa-solid fa-code"></i> Courses we offer</Typography>
                                        </div>
                                        <div className="col-md-7">
                                            <Box sx={{ boxShadow: 3, background: '#fff', px: 2, pb: 2 }}>
                                                <div className="row">
                                                    {
                                                        Array?.isArray(list) && list?.length > 0 && list?.find(course => course?.isDeleted == 0) ?
                                                            Array?.isArray(list) && list?.map((val,key)=>(
                                                                <div key={key} className={`col-md-4 ${val?.isDeleted == 1 ? 'd-none' : ''}`}>
                                                                    <Button sx={{ boxShadow: 3, mt: 2, flexDirection: 'column', textAlign: 'left' }} fullWidth onClick={()=>{ setTimeout(() => { navigate(`/course-registration/${val?.course_id}`) }, 300) }}>
                                                                        <div className='rounded' style={{ width: '100%', height: '180px', backgroundImage: `url('${val?.courseBannerUrl}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                                                        <Box sx={{ width: '100%' }}>
                                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '13px', mt: 1 }} color='black'>{val?.courseName?.length > 25 ? `${val?.courseName?.substring(0,25)}...` : val?.courseName}</Typography>
                                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mt: 1, color: 'grey' }}>Fees: ₹{val?.fees}</Typography>
                                                                            {
                                                                                currentDate && val?.startingDate &&
                                                                                new Date(currentDate) <= new Date(val?.startingDate) ? (
                                                                                    <>
                                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mt: 1 }} color='error'><i class="text-uppercase fa-fade text-danger">Upcoming Batch</i></Typography>
                                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }} color='error'><i class="text-uppercase fa-fade text-danger">{formattedDate(val?.startingDate)}</i></Typography>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mt: 1, color: 'grey' }} color='black'>Recent Batch Started on</Typography>
                                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'grey' }} color='black'>{formattedDate(val?.startingDate)}</Typography>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mt: 1 }}><span className='text-secondary'>Details</span> | Apply</Typography>
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

export default Courses