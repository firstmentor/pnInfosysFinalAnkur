/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, IconButton, InputAdornment, Modal, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, resetStudentState } from '../../../Features/StudentRegistration/StudentRegistrationSlice';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    maxWidth: 500,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const StudentRegistrationList = () => {

    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'Student Registrations',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [detailedData, setDetailedData] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const { students, responseStatus, responseMessage } = useSelector(state => state.students)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getStudents())
    } 

    const formattedDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    }

    const filteredList = list?.filter(student =>
        student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.courseName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    const paginatedList = filteredList?.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const totalPages = Math?.ceil(filteredList?.length / recordsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1)
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDetail = (data) => {
        setDetailedData(data)
        setTimeout(() => {
            setShowModal(true)
        }, 300)
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(students?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetStudentState())
            }, 1000);
        }
    },[students, responseStatus, responseMessage])

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
                                        <TextField 
                                            type="search"
                                            id="search" 
                                            label="Search"
                                            variant="outlined"
                                            size='small'
                                            name='search'
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>#</th>
                                                    <th className='text-nowrap'>APPLIED FOR</th>
                                                    <th className='text-nowrap'>NAME</th>
                                                    <th className='text-nowrap'>PHONE</th>
                                                    <th className='text-nowrap'>EMAIL</th>
                                                    <th className='text-nowrap'>GENDER</th>
                                                    <th className='text-nowrap'>REGISTRATION DATE</th>
                                                    <th className='text-nowrap'>MORE INFO</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedList?.length > 0 ? (
                                                    paginatedList.map((val, key) => (
                                                        <tr key={key}>
                                                            <td className='text-nowrap'>{(currentPage - 1) * recordsPerPage + key + 1}.</td>
                                                            <td className='text-nowrap'>{val?.courseName}</td>
                                                            <td className='text-nowrap'>{val?.name}</td>
                                                            <td className='text-nowrap'>{val?.contactNumber}</td>
                                                            <td className='text-nowrap'>{val?.email}</td>
                                                            <td className='text-nowrap'>{val?.gender}</td>
                                                            <td className='text-nowrap'>{formattedDate(val?.createdAt)}</td>
                                                            <td className='text-nowrap'>
                                                                <Tooltip title="Click to Show Details" onClick={()=> handleDetail(val)}>
                                                                    <IconButton>
                                                                        <InfoOutlinedIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={8} style={{ textAlign: 'center' }}>
                                                            No Record Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>&nbsp;</div>
                                        <div className='d-flex align-items-center gap-2'>
                                            <Typography>Page {currentPage} of {totalPages}</Typography>
                                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ChevronLeftIcon /></Button>
                                                <Button>{currentPage}</Button>
                                                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRightIcon /></Button>
                                            </ButtonGroup>
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

            {/* detailed modal */}
            <Modal
                open={showModal}
                onClose={()=>setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" color='black' sx={{ fontWeight: 'bold' }} variant="h5" component="h5">
                        Student Details
                    </Typography>
                    <Box sx={{ my: 4, maxHeight: '260px', overflowY: 'auto' }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>NAME</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.name}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>APPLIED FOR</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.courseName}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>REGISTRATION DATE</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{formattedDate(detailedData?.createdAt)}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>EMAIL</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.email}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>CONTACT NUMBER</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.contactNumber}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>GENDER</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.gender}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>ADDRESS</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.address}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>COLLEGE</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.college}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>QUALIFICATION</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.qualification}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>BRANCH</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.branch}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>SEMESTER</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.semester}</Typography>
                        </Box>
                    </Box>
                    <Button type='button' size='small' variant='contained' color='error' onClick={()=>setTimeout(() => { 
                        setShowModal(false)
                    }, 300)}>Close</Button>
                </Box>
            </Modal>
        </>
    )
}

export default StudentRegistrationList