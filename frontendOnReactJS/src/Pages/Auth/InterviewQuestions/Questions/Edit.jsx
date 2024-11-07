/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../../Components/Layouts/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import FullPageLoading from '../../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import ErrorModal from '../../../../Components/Modals/ErrorModal';
import { getQuestion, resetQuestionState, updateQuestion } from '../../../../Features/InterviewQuestion/InterviewQuestionSlice';
import RichTextEditor from '../../../../Components/InputComponents/RichTextEditor';

const EditInterviewQuestion = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: questionId } = useParams()

    const breadcrumbData = {
        currentPage: 'Edit Interview Question',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Interview Question Courses', route: '/pn/interview-questions' },
            { page: 'Interview Question List', route: -1 },
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { questions, responseStatus, responseMessage } = useSelector(state => state.questions)

    const fetchData = (id) => {
        setIsLoading(true)
        dispatch(getQuestion(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setTimeout(() => {
            setIsLoading(true)
            
            const formdata = new FormData()
            formdata.append('id', questionId)
            formdata.append('question', question)
            formdata.append('answer', answer)
    
            dispatch(updateQuestion(formdata))
        }, 300)
    }

    useEffect(()=>{
        if (questionId) {
            fetchData(questionId)
        }
    },[questionId])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Question updated successfully'){
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => {
                dispatch(resetQuestionState())
            }, 5000);
        }
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            setQuestion(questions?.data?.question)
            setAnswer(questions?.data?.answer)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                dispatch(resetQuestionState())
                navigate('/pn/courses')
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
                                    <Typography color='error'>Fields with * are mandatory.</Typography>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <form onSubmit={handleSubmit}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Question"
                                                    sx={{ my: 2 }} 
                                                    variant="outlined"
                                                    name='question'
                                                    value={question}
                                                    onChange={e => setQuestion(e.target.value)} 
                                                    fullWidth
                                                    required
                                                />
                                                <RichTextEditor 
                                                    data={answer} 
                                                    onChange={(e)=>{
                                                        setAnswer(e)
                                                    }} 
                                                />
                                                <Button type='submit' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold', mt: 2 }} variant='contained' startIcon={<SaveIcon />}>Update</Button>
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

export default EditInterviewQuestion