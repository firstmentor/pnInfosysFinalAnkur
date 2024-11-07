/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, IconButton, InputAdornment, Modal, Switch, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../../Components/Layouts/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import FullPageLoading from '../../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteQuestion, getQuestions, resetQuestionState } from '../../../../Features/InterviewQuestion/InterviewQuestionSlice';


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

const SelectedCourseQuestionList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: courseId } = useParams()

    const breadcrumbData = {
        currentPage: 'Interview Questions',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Interview Question Courses', route: '/pn/interview-questions' }
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [detailedData, setDetailedData] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const { questions, responseStatus, responseMessage } = useSelector(state => state.questions)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getQuestions(courseId))
    }

    const filteredList = list?.filter(message =>
        message?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase())
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

    const formattedDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    }

    const handleStatusChange = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to change the status of this question?");
    
        if (confirmDelete) {
            setIsLoading(true);
            dispatch(deleteQuestion(id))
        }
    };

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(questions?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
        if(responseStatus == 'success' && responseMessage == 'Question deleted successfully'){
            fetchData()
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetQuestionState())
            }, 1000);
        }
    },[questions, responseStatus, responseMessage])

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
                                        <Button type='button' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} onClick={()=> setTimeout(() => { navigate(`/pn/add-interview-question/${courseId}`) }, 300)}>Add new</Button>
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>#</th>
                                                    <th className='text-nowrap'>ACTION</th>
                                                    <th className='text-nowrap'>COURSE</th>
                                                    <th className='text-nowrap'>QUESTION</th>
                                                    <th className='text-nowrap'>MORE INFO</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedList?.length > 0 ? (
                                                    paginatedList.map((val, key) => (
                                                        <tr key={key}>
                                                            <td className='text-nowrap'>{(currentPage - 1) * recordsPerPage + key + 1}.</td>
                                                            <td className='text-nowrap'>
                                                                <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/interview-question-edit/${val?.interview_question_id}`) }, 300)}>
                                                                    <IconButton>
                                                                        <EditIcon color='primary' />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Change Status" onClick={()=> handleStatusChange(val?.interview_question_id)}>
                                                                    <IconButton>
                                                                        <Switch 
                                                                            size="small"
                                                                            checked={val?.isDeleted == 0 ? 'checked' : ''} 
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                            <td className='text-nowrap'>{val.courseName}</td>
                                                            <td className='text-nowrap'>{val.question}</td>
                                                            <td className='text-nowrap'>
                                                                <Tooltip title="Show Answer" onClick={()=> handleDetail(val)}>
                                                                    <IconButton>
                                                                        <InfoOutlinedIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} style={{ textAlign: 'center' }}>
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
                        Details
                    </Typography>
                    <Box sx={{ my: 4, maxHeight: '260px', overflowY: 'auto' }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>COURSE</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.courseName}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>QUESTION</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{detailedData?.question}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>ANSWER</Typography>
                            <div><div dangerouslySetInnerHTML={{ __html: detailedData?.answer }} /></div>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'grey' }}>CREATED AT</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{formattedDate(detailedData?.createdAt)}</Typography>
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

export default SelectedCourseQuestionList