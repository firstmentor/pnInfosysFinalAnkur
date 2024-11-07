import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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

const SuccessModal = ({ open, setOpen, message }) => {

    const navigate = useNavigate()

    return (
        <>
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <center>
                        <Typography id="modal-modal-title" color='success' sx={{ fontWeight: 'bold' }} variant="h4" component="h4">
                            Congrats...!
                        </Typography>
                        <Typography variant='h6' id="modal-modal-description" sx={{ my: 4 }}>{message}</Typography>
                        <Button type='button' variant='contained' color='error' onClick={()=>setTimeout(() => { 
                            setOpen(false)
                            navigate(-1)
                        }, 300)}>Close</Button>
                    </center>
                </Box>
            </Modal>
        </>
    )
}

export default SuccessModal