/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthProtector = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('pnInfosysAuthToken')

        if (!token) {
            navigate('/login')
        }
    },[])

    return (
        <></>
    )
}

export default AuthProtector