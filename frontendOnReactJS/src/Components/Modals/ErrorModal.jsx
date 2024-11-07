import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

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

const ErrorModal = ({ open, setOpen, message }) => {
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
                        <Typography id="modal-modal-title" color='error' sx={{ fontWeight: 'bold' }} variant="h4" component="h4">
                            Oops...
                        </Typography>
                        <Typography variant='h6' id="modal-modal-description" sx={{ my: 4 }}>{message}</Typography>
                        <Button type='button' variant='contained' color='error' onClick={()=>setTimeout(() => { setOpen(false) }, 300)}>Close</Button>
                    </center>
                </Box>
            </Modal>
        </>
    )
}

export default ErrorModal