const express = require('express')
const UserController = require('../controllers/UserController')
const middleWare = require('../middleware/Auth')
const CourseController = require('../controllers/CourseController')
const CertificateController = require('../controllers/CertificateController')
const ContactMessageController = require('../controllers/ContactMessageController')
const InterviewQuestionController = require('../controllers/InterviewQuestionController')
const InterviewQuestionCourseController = require('../controllers/InterviewQuestionCourseController')
const PlacementController = require('../controllers/PlacementController')
const router = express.Router()


// UserController
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/student-registration', UserController.studentRegistration)
router.get('/students', middleWare, UserController.fetchRegisteredStudent)
router.get('/dashboard-data', middleWare, UserController.fetchDashboardData)
router.get('/get-user', middleWare, UserController.fetchUser)
router.put('/update-user', middleWare, UserController.updateUser)
router.put('/update-user-password', middleWare, UserController.updatePassword)

// CourseController
router.post('/course', middleWare, CourseController.store)
router.get('/course', CourseController.fetchAll)
router.get('/course/:id', CourseController.fetchSingle)
router.put('/course/:id', middleWare, CourseController.update)
router.delete('/course/:id', middleWare, CourseController.delete)

// CertificateController
router.post('/certificate', middleWare, CertificateController.store)
router.get('/certificate', CertificateController.fetchAll)
router.get('/certificate/:id', middleWare, CertificateController.fetchSingle)
router.put('/certificate/:id', middleWare, CertificateController.update)
router.delete('/certificate/:id', middleWare, CertificateController.delete)

// ContactMessageController
router.post('/contact-message', ContactMessageController.store)
router.get('/contact-message', middleWare, ContactMessageController.fetchAll)
router.get('/contact-message/:id', middleWare, ContactMessageController.fetchSingle)

// InterviewQuestionCourseController
router.post('/interview-question-course', middleWare, InterviewQuestionCourseController.store)
router.get('/interview-question-course', InterviewQuestionCourseController.fetchAll)
router.get('/interview-question-course/:id', InterviewQuestionCourseController.fetchSingle)
router.put('/interview-question-course/:id', middleWare, InterviewQuestionCourseController.update)
router.delete('/interview-question-course/:id', middleWare, InterviewQuestionCourseController.delete)

// InterviewQuestionController
router.post('/interview-question', middleWare, InterviewQuestionController.store)
router.get('/interview-question/:id', InterviewQuestionController.fetchAll)
router.get('/interview-question-selected-course/:id', InterviewQuestionController.fetchByCourseId)
router.get('/single-interview-question/:id', InterviewQuestionController.fetchSingle)
router.put('/interview-question/:id', middleWare, InterviewQuestionController.update)
router.delete('/interview-question/:id', middleWare, InterviewQuestionController.delete)

// PlacementController
router.post('/placement', middleWare, PlacementController.store)
router.get('/placement', PlacementController.fetchAll)
router.get('/placement/:id', middleWare, PlacementController.fetchSingle)
router.put('/placement/:id', middleWare, PlacementController.update)
router.delete('/placement/:id', middleWare, PlacementController.delete)


module.exports = router