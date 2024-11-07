import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = () => {

    const { pathname } = useLocation()
    const { id: paramId } = useParams()

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top shadow-sm" style={{ background: '#fff' }}>
                <div className="container">
                    <Link className="navbar-brand" to="/"><img src="/colorlogo.png" className='bg-white p-1 border border-secondary-subtle rounded' style={{ height: '40px' }} alt="/colorlogo.png" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/' ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/about' ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/courses' || pathname == `/course-registration/${paramId}` ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/courses">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/certificates' ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/certificates">Certificates</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/placements' ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/placements">Placements</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/course-list-for-interview-question' || pathname == `/interview-question/${paramId}` ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/course-list-for-interview-question">Interview Question</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fst-italic fw-bold ${pathname == '/contact-us' ? 'bg-white p-1 border border-secondary-subtle rounded text-primary' : ''}`} to="/contact-us">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fst-italic fw-bold" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fst-italic fw-bold" rel='noreferrer' target='_blank' href="https://www.facebook.com/pninfosys"><FacebookIcon color='primary' /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fst-italic fw-bold" rel='noreferrer' target='_blank' href="https://www.youtube.com/@pninfosys">< YouTubeIcon color='error' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar