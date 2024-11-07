import React from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import { Box, Typography } from '@mui/material'
import Footer from '../../Components/Layouts/Footer'

const Home = () => {

    return (
        <>
            <Navbar />

            <div className="container-fluid" style={{ backgroundImage: `url('/bannerFinal.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row">
                    {/* <div className="col-md-5 d-flex align-items-center justify-content-center text-white px-5" style={{ height: '100vh', background: '#003c57a6' }}> */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center text-white px-5" style={{ height: '100vh', background: 'rgb(0 113 187 / 82%)' }}>
                        <Box>
                            <Typography variant='h4'>Welcome to</Typography>
                            <Typography variant='h3'>PNINFOSYS</Typography>
                            <Typography sx={{ fontSize: '13px' }} style={{textAlign: 'justify'}} >We offer comprehensive internships in web development where you'll gain hands-on experience working on real-world projects. Our expert team will mentor you in essential web technologies, including front-end and back-end development, while ensuring you build a strong foundation in user experience (UX) and responsive design.  In addition to our training programs, we provide top-notch web services tailored to meet the diverse needs of businesses. Whether you're looking to create stunning websites or learn the craft, PN INFOSYS is your gateway to a successful future in tech!</Typography>
                        </Box>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12 py-5">
                        <div>
                            <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic' }} color='primary'>Who we are ?</Typography>
                            <Typography variant='h6' sx={{ textAlign: 'center', fontStyle: 'italic' }} style={{textAlign: 'justify'}}>We are part of this IT industry since 2018, we not only developed products and websites but also provides internship and trainning to students and make them capable to work in this It software industry, our internship and trainning program is totally based on hand to hand pratical with live projects.</Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0" style={{ backgroundImage: `url('/contentBgTwo.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div style={{ background: 'rgb(0 113 187 / 75%)' }}>
                    <div className="container py-5">
                        <div className="row text-white">
                            <div className="col-md-12 mb-5">
                                <Typography variant='h4' sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}><i className='fa-solid fa-graduation-cap'></i> Learning Environment,<br />Free Internship To Novice Students</Typography>
                            </div>
                            <div className="col-md-6">
                                <Typography variant='h5' sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', pt: 3 }}>Web Designing</Typography>
                                <Typography sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }} style={{textAlign: 'justify'}}>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects. Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development rather than software development. Web design used to be focused on designing websites for desktop browsers; however, since the mid-2010s, design for mobile and tablet browsers has become ever-increasingly important. At PN INFOSYS, we pride ourselves on being more than just another IT company. One of the key aspects that makes us stand out is our commitment to nurturing the next generation of IT professionals. We don't just provide theoretical training to novice students—we actively involve them in hands-on learning through live projects. By doing this, we ensure that our trainees gain practical experience, develop critical problem-solving skills, and are better prepared to tackle real-world challenges. This unique approach gives our students a competitive edge, allowing them to transition smoothly from learners to professionals.</Typography>
                            </div>
                            <div className="col-md-6">
                                <img src="https://pninfosys.com/assets/e-learning-BJHR4tLg.png" className='w-100 pt-3' alt="/2-2-web-design-png-image.png" />
                            </div>
                            <div className="col-md-6">
                                <center>
                                    <img src="development-4536630_1280.png" className='w-75 pt-3' alt="development-4536630_1280.png" />
                                </center>
                            </div>
                            <div className="col-md-6">
                                <Typography variant='h5' sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', pt: 3 }}>Web Development</Typography>
                                <Typography sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }} style={{textAlign: 'justify'}}>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects. Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.Among Web professionals, "Web development" usually refers to the main non-design aspects of building Web sites: writing markup and coding. Web development may use content management systems (CMS) to make content changes easier and available with basic technical skills.</Typography>
                            </div>
                            <div className="col-md-6">
                                <Typography variant='h5' sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', pt: 3 }}>App Development</Typography>
                                <Typography sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }} style={{textAlign: 'justify'}}>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects. Mobile app development is the act or process by which a mobile app is developed for mobile devices, such as personal digital assistants, enterprise digital assistants or mobile phones. These software applications are designed to run on mobile devices, such as a smartphone or tablet computer. These applications can be pre-installed on phones during manufacturing platforms, or delivered as web applications using server-side or client-side processing (e.g., JavaScript) to provide an "application-like" experience within a web browser. Application software developers also must consider a long array of screen sizes, hardware specifications, and configurations because of intense competition in mobile software and changes within each of the platforms. Mobile app development has been steadily growing, in revenues and jobs created. A 2013 analyst report estimates there are 529,000 direct app economy jobs within the EU then 28 members (including the UK), 60 percent of which are mobile app developers.</Typography>
                            </div>
                            <div className="col-md-6">
                                <center>
                                    <img src="/3d-illustration-of-web-development-png.png" className='w-75' alt="/3d-illustration-of-web-development-png.png" />
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid" style={{ background: '#f0f2f7', padding: '100px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-react' style={{ color: '#61dbfb', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>ReactJS</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-angular' style={{ color: '#dd1b16', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>AngularJS</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-node' style={{ color: '#026e00', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>NodeJS</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-node-js' style={{ color: '#555', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>ExpressJS</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-solid fa-database' style={{ color: '#00ed64', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>MongoDB</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-html5' style={{ color: '#e44d26', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>HTML</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-css3-alt' style={{ color: '#0071bb', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>CSS</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-bootstrap' style={{ color: '#62468b', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>BootStrap</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-square-js' style={{ color: '#f7e018', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>JavaScript</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-solid fa-database' style={{ color: '#f29221', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>MySQL</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-php' style={{ color: '#6182b7', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>PHP</Typography>
                            </center>
                        </div>
                        <div className="col-md-3 mb-3">
                            <center>
                                <i className='fa-brands fa-laravel' style={{ color: '#f72c1e', fontSize: '150px' }}></i>
                                <Typography sx={{ fontSize: '40px' }}>Laravel</Typography>
                            </center>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home