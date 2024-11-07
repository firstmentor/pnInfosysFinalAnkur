import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import authUsersReducer from "./Features/AuthUser/AuthUserSlice";
import certficatesReducer from "./Features/Certificate/CertificateSlice";
import contactMessagesReducer from "./Features/ContactMessage/ContactMessageSlice";
import coursesReducer from "./Features/Course/CourseSlice";
import interviewQuestionsReducer from "./Features/InterviewQuestion/InterviewQuestionSlice";
import interviewQuestionCoursesReducer from "./Features/InterviewQuestionCourse/InterviewQuestionCourseSlice";
import placementsReducer from "./Features/Placement/PlacementSlice";
import studentsReducer from "./Features/StudentRegistration/StudentRegistrationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        authUsers: authUsersReducer,
        certificates: certficatesReducer,
        messages: contactMessagesReducer,
        courses: coursesReducer,
        questions: interviewQuestionsReducer,
        questionCourses: interviewQuestionCoursesReducer,
        placements: placementsReducer,
        students: studentsReducer,
    },
});