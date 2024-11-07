/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { getCourse, resetCourseState } from '../../../Features/Course/CourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import { createStudent, resetStudentState } from '../../../Features/StudentRegistration/StudentRegistrationSlice';
import SuccessModal from '../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../Components/Modals/ErrorModal';

const CourseRegistration = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: updateId } = useParams()

    const fields = {
        courseId: '',
        courseName: '',
        name: '',
        email: '',
        contactNumber: '',
        gender: '',
        address: '',
        college: '',
        branch: '',
        qualification: '',
        semester: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [courseData, setCourseData] = useState('')
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { courses, responseStatus, responseMessage } = useSelector(state => state.courses)
    const { students, responseStatus: studentResponseStatus, responseMessage: studentResponseMessage } = useSelector(state => state.students)

    const fetchData = (id) => {
        setIsLoading(true)
        dispatch(getCourse(id))
    }

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)
        dispatch(createStudent(data))
    }

    useEffect(()=>{
        if (updateId) {
            fetchData(updateId)
        }
    },[updateId])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            if (courses?.data?.isDeleted == 1) {
                navigate(-1)
            } else {
                setCourseData(courses?.data)
                setData({
                    ...data,
                    courseId: updateId,
                    courseName: courses?.data?.courseName
                })
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }
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

    useEffect(()=>{
        if(studentResponseStatus == 'success' && studentResponseMessage == 'Details submitted successfully, we will contact you soon, Thank you.'){
            setShowSuccess(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
            setTimeout(() => {
                dispatch(resetStudentState())
                navigate(-1)
            }, 5000);
        }
        if(studentResponseStatus == 'rejected' && studentResponseMessage != '' && studentResponseMessage != null){
            setIsLoading(false)
            setShowError(true)
        }
    },[students, studentResponseStatus, studentResponseMessage])

    return (
        <>
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />

            <Navbar />

            <div className="container">
                <div className='py-5'>
                    <div className="row py-5">
                        <div className="col-md-12">
                            <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                                <div className='w-100'>
                                    <center>
                                        <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3 }} color='primary'>Register Yourself Here!</Typography>
                                    </center>
                                    <div className="row mt-4">
                                        <div className="col-md-6" style={{ backgroundImage: `url('${courseData?.courseBannerUrl}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                        <div className="col-md-6">
                                            <Box sx={{ boxShadow: 3, background: '#fff', p: 4 }}>
                                                <Typography color='primary' variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>Apply for {courseData?.courseName}</Typography>
                                                <Typography color='error' sx={{ mb: 3 }}>All fields are mandatory.</Typography>
                                                <form onSubmit={handleSubmit}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Your Name"
                                                        sx={{ mb: 3 }} 
                                                        variant="outlined"
                                                        name='name'
                                                        value={data?.name}
                                                        onChange={handleInput}
                                                        fullWidth 
                                                        required
                                                    />
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Your Email"
                                                        sx={{ mb: 3 }} 
                                                        variant="outlined"
                                                        name='email'
                                                        value={data?.email}
                                                        onChange={handleInput}
                                                        fullWidth 
                                                        required
                                                    />
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Your Contact Number"
                                                        sx={{ mb: 3 }} 
                                                        variant="outlined"
                                                        name='contactNumber'
                                                        value={data?.contactNumber}
                                                        onChange={handleInput}
                                                        fullWidth 
                                                        required
                                                    />
                                                    <FormControl sx={{ mb: 3 }} fullWidth required>
                                                        <InputLabel id="demo-simple-select-label">Your Gender</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Your Gender"
                                                            name='gender'
                                                            value={data?.gender}
                                                            onChange={handleInput}
                                                        >
                                                            <MenuItem value="MALE">MALE</MenuItem>
                                                            <MenuItem value="FEMALE">FEMALE</MenuItem>
                                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        sx={{ mb: 3 }}
                                                        label="Your Address"
                                                        name='address'
                                                        value={data?.address}
                                                        onChange={handleInput}
                                                        multiline
                                                        rows={4}
                                                        fullWidth
                                                        required
                                                    />
                                                    <FormControl sx={{ mb: 3 }} fullWidth required>
                                                        <InputLabel id="demo-simple-select-label">Your College</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Your College"
                                                            name='college'
                                                            value={data?.college}
                                                            onChange={handleInput}
                                                        >
                                                            <MenuItem value="RJIT">RJIT</MenuItem>
                                                            <MenuItem value="SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT">SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT</MenuItem>
                                                            <MenuItem value="MPCT">MPCT</MenuItem>
                                                            <MenuItem value="MITS">MITS</MenuItem>
                                                            <MenuItem value="ITM">ITM</MenuItem>
                                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl sx={{ mb: 3 }} fullWidth required>
                                                        <InputLabel id="demo-simple-select-label">Your Qualification</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Your Qualification"
                                                            name='qualification'
                                                            value={data?.qualification}
                                                            onChange={handleInput}
                                                        >
                                                            <MenuItem value="B.TECH">B.TECH</MenuItem>
                                                            <MenuItem value="BCA">BCA</MenuItem>
                                                            <MenuItem value="MCA">MCA</MenuItem>
                                                            <MenuItem value="B.SC.">B.SC.</MenuItem>
                                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl sx={{ mb: 3 }} fullWidth required>
                                                        <InputLabel id="demo-simple-select-label">Your Branch</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Your Branch"
                                                            name='branch'
                                                            value={data?.branch}
                                                            onChange={handleInput}
                                                        >
                                                            <MenuItem value="CSE">CSE</MenuItem>
                                                            <MenuItem value="IT">IT</MenuItem>
                                                            <MenuItem value="EE">EE</MenuItem>
                                                            <MenuItem value="EC">EC</MenuItem>
                                                            <MenuItem value="MECHANICAL">MECHANICAL</MenuItem>
                                                            <MenuItem value="CIVIL">CIVIL</MenuItem>
                                                            <MenuItem value="AUTOMOBILE">AUTOMOBILE</MenuItem>
                                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl sx={{ mb: 3 }} fullWidth required>
                                                        <InputLabel id="demo-simple-select-label">Your Semester</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Your Semester"
                                                            name='semester'
                                                            value={data?.semester}
                                                            onChange={handleInput}
                                                        >
                                                            <MenuItem value="FIRST">FIRST</MenuItem>
                                                            <MenuItem value="SECOND">SECOND</MenuItem>
                                                            <MenuItem value="THIRD">THIRD</MenuItem>
                                                            <MenuItem value="FOURTH">FOURTH</MenuItem>
                                                            <MenuItem value="FIFTH">FIFTH</MenuItem>
                                                            <MenuItem value="SIXTH">SIXTH</MenuItem>
                                                            <MenuItem value="SEVENTH">SEVENTH</MenuItem>
                                                            <MenuItem value="EIGHTH">EIGHTH</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <Button type='submit' size='large' variant='contained' className='bg-gradient' startIcon={<GroupAddIcon />} fullWidth>Click to Register</Button>
                                                </form>
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

            <SuccessModal open={showSuccess} setOpen={setShowSuccess} message={studentResponseMessage} />
            <ErrorModal open={showError} setOpen={setShowError} message={studentResponseMessage} />
        </>
    )
}

export default CourseRegistration