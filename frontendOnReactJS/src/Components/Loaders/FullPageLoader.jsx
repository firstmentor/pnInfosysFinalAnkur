import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function FullPageLoading({ isLoading, setIsLoading }) {
    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
                onClick={()=>setIsLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}