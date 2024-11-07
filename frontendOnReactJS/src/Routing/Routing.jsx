import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Front/Login'
import Home from '../Pages/Front/Home'
import About from '../Pages/Front/About'
import Courses from '../Pages/Front/Course/Courses'
import CourseRegistration from '../Pages/Front/Course/CourseRegistration'
import CourseListForInterviewQuestion from '../Pages/Front/InterviewQuestion/CourseList'
import InterviewQuestion from '../Pages/Front/InterviewQuestion/InterviewQuestion'
import Certificates from '../Pages/Front/Certificates'
import ContactUs from '../Pages/Front/ContactUs'
import DashboardIndex from '../Pages/Auth/Dashboard/Index'
import CourseList from '../Pages/Auth/Courses/List'
import AddCourse from '../Pages/Auth/Courses/Add'
import CertificateList from '../Pages/Auth/Certificates/List'
import AddCertificate from '../Pages/Auth/Certificates/Add'
import Placements from '../Pages/Front/Placements'
import StudentRegistrationList from '../Pages/Auth/StudentRegistrations/List'
import EditCourse from '../Pages/Auth/Courses/Edit'
import PlacementList from '../Pages/Auth/Placements/List'
import AddPlacement from '../Pages/Auth/Placements/Add'
import EditCertificate from '../Pages/Auth/Certificates/Edit'
import EditPlacement from '../Pages/Auth/Placements/Edit'
import ContactMessageList from '../Pages/Auth/ContactMessage/List'
import InterviewQuestionCourseList from '../Pages/Auth/InterviewQuestions/Courses/List'
import AddInterviewQuestionCourse from '../Pages/Auth/InterviewQuestions/Courses/Add'
import EditInterviewQuestionCourse from '../Pages/Auth/InterviewQuestions/Courses/Edit'
import SelectedCourseQuestionList from '../Pages/Auth/InterviewQuestions/Questions/List'
import AddInterviewQuestion from '../Pages/Auth/InterviewQuestions/Questions/Add'
import EditInterviewQuestion from '../Pages/Auth/InterviewQuestions/Questions/Edit'
import MyProfile from '../Pages/Auth/MyProfile/Index'

const Routing = () => {
    return (
        <>
            <Routes>
                {/* Guest Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/course-registration/:id' element={<CourseRegistration />} />
                <Route path='/course-list-for-interview-question' element={<CourseListForInterviewQuestion />} />
                <Route path='/interview-question/:id' element={<InterviewQuestion />} />
                <Route path='/certificates' element={<Certificates />} />
                <Route path='/placements' element={<Placements />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/login' element={<Login />} />

                {/* Protected Routes */}
                {/* Dashboard */}
                <Route path='/pn/dashboard' element={<DashboardIndex />} />
                {/* Course */}
                <Route path='/pn/courses' element={<CourseList />} />
                <Route path='/pn/add-course' element={<AddCourse />} />
                <Route path='/pn/edit-course/:id' element={<EditCourse />} />
                {/* Registration */}
                <Route path='/pn/student-registration' element={<StudentRegistrationList />} />
                {/* Certificate */}
                <Route path='/pn/certificates' element={<CertificateList />} />
                <Route path='/pn/add-certificate' element={<AddCertificate />} />
                <Route path='/pn/certificate-edit/:id' element={<EditCertificate />} />
                {/* Placement */}
                <Route path='/pn/placements' element={<PlacementList />} />
                <Route path='/pn/add-placement' element={<AddPlacement />} />
                <Route path='/pn/placement-edit/:id' element={<EditPlacement />} />
                {/* Interview Question Course */}
                <Route path='/pn/interview-questions' element={<InterviewQuestionCourseList />} />
                <Route path='/pn/add-interview-question-course' element={<AddInterviewQuestionCourse />} />
                <Route path='/pn/interview-question-course-edit/:id' element={<EditInterviewQuestionCourse />} />
                {/* Interview Question */}
                <Route path='/pn/selected-course-interview-question/:id' element={<SelectedCourseQuestionList />} />
                <Route path='/pn/add-interview-question/:id' element={<AddInterviewQuestion />} />
                <Route path='/pn/interview-question-edit/:id' element={<EditInterviewQuestion />} />
                {/* Contact Message */}
                <Route path='/pn/messages' element={<ContactMessageList />} />
                {/* Contact Message */}
                <Route path='/pn/my-profile' element={<MyProfile />} />
            </Routes>
        </>
    )
}

export default Routing