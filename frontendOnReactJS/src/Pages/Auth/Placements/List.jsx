/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, ButtonGroup, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacements, resetPlacementState } from '../../../Features/Placement/PlacementSlice';

const PlacementList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'Placements',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const { placements, responseStatus, responseMessage } = useSelector(state => state.placements)

    const fetchList = () => {
        setIsLoading(true)
        dispatch(getPlacements())
    }

    const formattedDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    }

    const filteredList = list?.filter(student =>
        student?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    const paginatedList = filteredList?.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const totalPages = Math?.ceil(filteredList?.length / recordsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1)
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(()=>{
        fetchList()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(placements?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetPlacementState())
            }, 1000);
        }
    },[placements, responseStatus, responseMessage])

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
                                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                                        <TextField 
                                            type="search"
                                            id="search" 
                                            label="Search"
                                            variant="outlined"
                                            size='small'
                                            name='search'
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button type='button' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} onClick={()=> setTimeout(() => { navigate(`/pn/add-placement`) }, 300)}>Add new</Button>
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>#</th>
                                                    <th className='text-nowrap'>ACTION</th>
                                                    <th className='text-nowrap'></th>
                                                    <th className='text-nowrap'>STUDENT NAME</th>
                                                    <th className='text-nowrap'>COMPANY NAME</th>
                                                    <th className='text-nowrap'>DESIGNATION</th>
                                                    <th className='text-nowrap'>CREATED AT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {paginatedList?.length > 0 ? (
                                                    paginatedList.map((val, key) => (
                                                        <tr key={key}>
                                                            <td className='text-nowrap'>{(currentPage - 1) * recordsPerPage + key + 1}.</td>
                                                            <td className='text-nowrap'>
                                                                <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/placement-edit/${val?.placement_id}`) }, 300)}>
                                                                    <IconButton>
                                                                        <EditIcon color='primary' />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                            <td className='text-nowrap'><Avatar alt={val?.studentImageUrl} src={val?.studentImageUrl} /></td>
                                                            <td className='text-nowrap'>{val.studentName}</td>
                                                            <td className='text-nowrap'>{val.company}</td>
                                                            <td className='text-nowrap'>{val.designation}</td>
                                                            <td className='text-nowrap'>{formattedDate(val.createdAt)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={8} style={{ textAlign: 'center' }}>
                                                            No Record Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>&nbsp;</div>
                                        <div className='d-flex align-items-center gap-2'>
                                            <Typography>Page {currentPage} of {totalPages}</Typography>
                                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ChevronLeftIcon /></Button>
                                                <Button>{currentPage}</Button>
                                                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRightIcon /></Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </Box>

                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </Box>
            </div>

            <MobileMenus />
        </>
    )
}

export default PlacementList