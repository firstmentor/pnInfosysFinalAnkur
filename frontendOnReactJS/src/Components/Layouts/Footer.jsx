import { Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="container-fluid p-0" style={{ backgroundImage: `url('/footerImage.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className='pt-5 pb-4' style={{ background: 'rgb(0 113 187 / 57%)' }}>
                    <Typography variant='h3' color='white' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>PN<Typography variant='h3' sx={{ color: '#000', fontWeight: 'bold' }}>INFO</Typography>SYS</Typography>
                    <hr style={{ color: '#fff' }} />
                    <div className="container">
                        <div className="row mt-4 text-white">
                            <div className="col-md-4">
                                <center>
                                    <Typography><i className='fa-solid fa-envelope'></i> Email</Typography>
                                    <Typography>www.pninfosys.com</Typography>
                                    <Typography>support@pninfosys.com</Typography>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <center>
                                    <Typography><i className='fa-solid fa-phone'></i> Phone</Typography>
                                    <Typography>+91 7000846823</Typography>
                                    <Typography>+91 7415289378</Typography>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <center>
                                    <Typography><i className='fa-solid fa-location-dot'></i> Street Address</Typography>
                                    <Typography>MIG-332 Darpan Colony,Thatipur,<br />Gwalior,Madhya Pradesh</Typography>
                                </center>
                            </div>
                        </div>
                    </div>
                    <hr style={{ color: '#fff' }} />
                    <Typography sx={{ color: '#fff', textAlign: 'center' }}>Copyright © PNINFOSYS</Typography>
                </div>
            </div>
        </>
    )
}

export default Footer