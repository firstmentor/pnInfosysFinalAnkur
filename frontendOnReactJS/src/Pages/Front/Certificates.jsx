import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import Footer from '../../Components/Layouts/Footer'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCertificates, resetCertificateState } from '../../Features/Certificate/CertificateSlice';

const Certificates = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;

    const { certificates, responseStatus, responseMessage } = useSelector(state => state.certificates)

    const fetchList = () => {
        setIsLoading(true)
        dispatch(getCertificates())
    }

    const filteredList = list?.filter(student =>
        student?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
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

    useEffect(()=>{
        fetchList()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(certificates?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetCertificateState())
            }, 1000);
        }
    },[certificates, responseStatus, responseMessage])

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-5" style={{ backgroundImage: `url('/certifiedStudentImage2.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row py-5">
                    <div className="col-md-12">
                        <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 rounded'>
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ background: 'rgb(0 113 187 / 57%)' }}>
                                        <Box sx={{ pb: 3, px: 4 }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', pt: 3, color: '#fff' }} color='primary'><i className="fa-solid fa-award"></i> Our Certified Students</Typography>
                                        </Box>
                                    </div>
                                    <div className="col-md-8">
                                        <Box sx={{ boxShadow: 3, background: '#ffffffe3', p: 2}}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Box sx={{ background: '#fff', boxShadow: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography>&nbsp;</Typography>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Typography>Page {currentPage} of {totalPages}</Typography>
                                                            <Tooltip title="Previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                                <IconButton>
                                                                    <KeyboardArrowLeftIcon color='black' />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                                <IconButton>
                                                                    <KeyboardArrowRightIcon color='black' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </div>
                                                {paginatedList?.length > 0 ? (
                                                    paginatedList.map((val, key) => (
                                                        <div key={key} className="col-md-3 mt-3">
                                                            <Box sx={{ boxShadow: 5, p: 1, background: '#fff' }}>
                                                                <div style={{ backgroundImage: `url('${val?.studentImageUrl}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '200px', width: '100%' }}></div>
                                                                <Box sx={{ p: 1 }}>
                                                                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }} color='primary'>{val?.studentName}</Typography>
                                                                    <Typography sx={{ fontSize: '13px' }}>Course: {val?.course}</Typography>
                                                                    <Typography sx={{ fontSize: '13px' }}>Duration: {val?.duration}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-md-12 mt-3">
                                                        <center><Typography>No Record Found</Typography></center>
                                                    </div>
                                                )}
                                            </div>
                                        </Box>
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

export default Certificates