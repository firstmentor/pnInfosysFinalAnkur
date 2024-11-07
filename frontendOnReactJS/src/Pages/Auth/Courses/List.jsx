/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourses, resetCourseState } from '../../../Features/Course/CourseSlice';

const CourseList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'Courses',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

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

    const handleStatusChange = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to change the status of this course?");
    
        if (confirmDelete) {
            setIsLoading(true);
            dispatch(deleteCourse(id))
        }
    };

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
        if(responseStatus == 'success' && responseMessage == 'Course status changed successfully'){
            fetchList()
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
                                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                                        <div>&nbsp;</div>
                                        <Button type='button' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} onClick={()=> setTimeout(() => { navigate(`/pn/add-course`) }, 300)}>Add new</Button>
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>#</th>
                                                    <th className='text-nowrap'>ACTION</th>
                                                    <th className='text-nowrap'>STATUS</th>
                                                    <th className='text-nowrap'>BANNER</th>
                                                    <th className='text-nowrap'>COURSE</th>
                                                    <th className='text-nowrap'>DURATION</th>
                                                    <th className='text-nowrap'>FEES</th>
                                                    <th className='text-nowrap'>NEW BATCH</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array?.isArray(list) && list?.length > 0 ?
                                                    Array?.isArray(list) && list?.map((val,key)=>(
                                                        <tr key={key}>
                                                            <td className='text-nowrap'>{key+1}.</td>
                                                            <td className='text-nowrap'>
                                                                <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/edit-course/${val?.course_id}`) }, 300)}>
                                                                    <IconButton>
                                                                        <EditIcon color='primary' />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Change Status" onClick={()=> handleStatusChange(val?.course_id)}>
                                                                    <IconButton>
                                                                        <Switch 
                                                                            size="small"
                                                                            checked={val?.isDeleted == 0 ? 'checked' : ''} 
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                            <td className='text-nowrap'><Typography sx={{ fontSize: '13px', fontWeight: 'bold' }} color={val?.isDeleted == 0 ? 'success' : 'error'}>{ val?.isDeleted == 0 ? 'ACTIVE' : 'INACTIVE' }</Typography></td>
                                                            <td className='text-nowrap'><Avatar alt={val?.courseBannerUrl} src={val?.courseBannerUrl} /></td>
                                                            <td className='text-nowrap'>{val?.courseName}</td>
                                                            <td className='text-nowrap'>{val?.duration}</td>
                                                            <td className='text-nowrap'>₹{val?.fees}</td>
                                                            {
                                                                currentDate && val?.startingDate &&
                                                                new Date(currentDate) <= new Date(val?.startingDate) ? (
                                                                    <td className='text-nowrap'>
                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }} color='error'>
                                                                            <span className='fa-fade'>
                                                                                Starting on {formattedDate(val?.startingDate)}
                                                                            </span>
                                                                        </Typography>
                                                                    </td>
                                                                ) : (
                                                                    <td className='text-nowrap'>
                                                                        <Typography sx={{ fontSize: '13px' }}>
                                                                            {val?.startingDate && val?.startingDate !== '' ? (
                                                                                <>Started on {formattedDate(val?.startingDate)}</>
                                                                            ) : (
                                                                                '-'
                                                                            )}
                                                                        </Typography>
                                                                    </td>
                                                                )
                                                            }
                                                        </tr>
                                                    ))
                                                    :
                                                    <>
                                                        <tr>
                                                            <td colSpan={7} className='text-center'>No Record Found</td>
                                                        </tr>
                                                    </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Box>

                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </Box>
            </div>

            <MobileMenus />
        </>
    )
}

export default CourseList