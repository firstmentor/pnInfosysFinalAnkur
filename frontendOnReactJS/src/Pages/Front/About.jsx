import React from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import Footer from '../../Components/Layouts/Footer'
import { Box, Typography } from '@mui/material'

const About = () => {
    return (
        <>
            <Navbar />

            <div className="container-fluid mt-5" style={{ backgroundImage: `url('/aboutUsImage3.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row py-5">
                    <div className="col-md-12">
                        <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 rounded'>
                                <div className="row">
                                    <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ background: 'rgb(0 113 187 / 68%)' }}>
                                        <Box sx={{ pb: 3 }}>
                                            <Typography variant='h4' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3, color: '#fff' }} color='primary'><i className="fa-regular fa-circle-question"></i> Who we are</Typography>
                                        </Box>
                                    </div>
                                    <div className="col-md-7">
                                        <Box sx={{ boxShadow: 3, p: 4, background: '#ffffffe3' }}>
                                            <Typography>We are a one-stop destination for all digital solution, be it website designing,web development, digital marketing, SEO, mobile apps and full maintenance and compliance services for Government and Commercial facilities both large and small.. Our elegant group of Developers provide their innovation who transform your idea into an amazing website Design or Mobile App Development while keeping every custom project unique. <br />We are part of this IT industry since 2018, we not only developed products and websites but also provides internship and trainning to students and make them capable to work in this It software industry, our internship and trainning program is totally based on hand to hand pratical with live projects. <br />Our team of IT professionals certified professionals services Dental Offices, Medical Offices, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world. Our team of IT professionals certified professionals services Hosptials, Colleges, Research Institutes, Schools, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world.</Typography>
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

export default About