/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import Footer from '../../Components/Layouts/Footer'
import { Box, Button, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, resetMessageState } from '../../Features/ContactMessage/ContactMessageSlice';
import FullPageLoading from '../../Components/Loaders/FullPageLoader';
import SuccessModal from '../../Components/Modals/SuccessModal';
import ErrorModal from '../../Components/Modals/ErrorModal';

const ContactUs = () => {

    const dispatch = useDispatch()

    const fields = {
        name: '',
        email: '',
        number: '',
        message: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { messages, responseStatus, responseMessage } = useSelector(state => state.messages)

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
            dispatch(createMessage(data))
        }, 300)
    }

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == `Your Message sent successfully, We'll contact you soon..!`){
            setIsLoading(false)
            setShowSuccess(true)
            setData({
                name: '',
                email: '',
                number: '',
                message: '',
            })
            setTimeout(() => {
                setShowSuccess(false)
                dispatch(resetMessageState())
            }, 5000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setShowError(true)
            setTimeout(() => {
                dispatch(resetMessageState())
            }, 1000);
        }
    },[messages, responseStatus, responseMessage])

    return (
        <>
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />
            <Navbar />

            <div className="container-fluid mt-5" style={{ backgroundImage: `url('/contactUsImage.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row py-5">
                    <div className="col-md-12">
                        <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 rounded'>
                                <div className="row">
                                    <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ background: 'rgb(0 113 187 / 57%)' }}>
                                        <Box sx={{ pb: 3 }}>
                                            <Typography variant='h4' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3, color: '#fff' }} color='primary'>Get in touch with <br /> PNINFOSYS!</Typography>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3, color: '#fff' }} color='primary'>Our Address</Typography>
                                            <Typography sx={{ mt: 1, color: '#fff' }} color='primary'>MIG-332 Darpan Colony, Thatipur, <br /> Gwalior,Madhya Pradesh</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>www.pninfosys.com</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>support@pninfosys.com</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>+91 7000846823</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>+91 7415289378</Typography>
                                        </Box>
                                    </div>
                                    <div className="col-md-7">
                                        <Box sx={{ boxShadow: 3, p: 4, background: '#fff' }}>
                                            <Typography sx={{ mb: 3 }}>For any general query, Please fill in the following contact form:</Typography>
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
                                                    name='number'
                                                    value={data?.number}
                                                    onChange={handleInput}
                                                    fullWidth 
                                                    required
                                                />
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    sx={{ mb: 3 }}
                                                    label="Your Message"
                                                    name='message'
                                                    value={data?.message}
                                                    onChange={handleInput}
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    required
                                                />
                                                <Button type='submit' size='large' variant='contained' className='bg-gradient' endIcon={<SendIcon />} fullWidth>Send message</Button>
                                            </form>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <SuccessModal open={showSuccess} setOpen={setShowSuccess} message={responseMessage} />
            <ErrorModal open={showError} setOpen={setShowError} message={responseMessage} />
        </>
    )
}

export default ContactUs