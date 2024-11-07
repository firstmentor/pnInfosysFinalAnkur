/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getQuestions, resetQuestionState } from '../../../Features/InterviewQuestion/InterviewQuestionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';

const InterviewQuestion = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: courseId } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])

    const { questions, responseStatus, responseMessage } = useSelector(state => state.questions)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getQuestions(courseId))
    }

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
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetQuestionState())
            }, 1000);
        }
    },[questions, responseStatus, responseMessage])

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
                                            <Box>
                                                <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 5 }} color='white'><i className="fa-solid fa-code"></i> Interview Questions</Typography>
                                                <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 1, mb: 4 }} color='white'>{list?.length > 0 ? list[0]?.data : ''}</Typography>
                                            </Box>
                                        </div>
                                        <div className="col-md-7">
                                            <Box sx={{ boxShadow: 3, background: '#fff', p: 4 }}>
                                                {
                                                    Array?.isArray(list) && list?.length > 0 ?
                                                        Array?.isArray(list) && list?.map((val,key)=>(
                                                            <Accordion key={key}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1-content"
                                                                    id="panel1-header"
                                                                >
                                                                    {val?.question}
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div><div dangerouslySetInnerHTML={{ __html: val?.answer }} /></div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))
                                                    :
                                                    <div className="col-md-12">
                                                        <center><Typography sx={{ fontWeight: 'bold', fontSize: '15px', mt: 2 }}>No Question Added Yet</Typography></center>
                                                    </div>
                                                }
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

export default InterviewQuestion