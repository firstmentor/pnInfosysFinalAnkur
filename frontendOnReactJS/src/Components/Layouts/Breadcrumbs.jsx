import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrumbs = ({ data }) => {

    const navigate = useNavigate()

    // sample breadcrumb format

    // const breadcrumbData = {
    //     currentPage: 'Dashboard',
    //     previousPages: [
    //         { page: '', route: '' }
    //     ]
    // }

    return (
        <>
            <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                <Typography>{data?.currentPage}</Typography>
                {
                    Array?.isArray(data?.previousPages) && data?.previousPages?.length > 0 ?
                        <div className='d-flex flex-wrap align-items-center gap-2'>
                            {
                                Array?.isArray(data?.previousPages) && data?.previousPages?.map((val,key)=>(
                                    <React.Fragment key={key}>
                                        <Typography sx={{ fontSize: '13px', cursor: 'pointer', fontWeight: 'bold', color: 'grey' }} onClick={()=>navigate(val?.route)}>{val?.page}</Typography>
                                        <Typography>/</Typography>
                                    </React.Fragment>
                                ))
                            }
                            <Typography sx={{ fontSize: '13px' }}>{data?.currentPage}</Typography>
                        </div>
                    : ''
                }
            </div>
        </>
    )
}

export default Breadcrumbs