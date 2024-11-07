const pool = require('../db/connectDB')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class InterviewQuestionCourseController {

    static store = async (req, res) => {
        try {
            const { 
                courseName,
            } = req.body;
            
            const [dataSaved] = await pool.query('INSERT INTO interview_question_courses SET ?', {
                courseName,
            });

            if (dataSaved.affectedRows > 0) {
                res.status(201).json({ 'status': 'success', 'message': 'Course Added Successfully' });
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchAll = async (req, res) => {
        try {
            
            const [data] = await pool.query('SELECT * FROM interview_question_courses ORDER BY interview_question_course_id DESC');
    
            res.status(200).json({
                success: true,
                data
            });
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static fetchSingle = async (req, res) => {
        try {
            const [data] = await pool.query('SELECT * FROM interview_question_courses WHERE interview_question_course_id = ?', [req.params.id]);

            res.status(200).json({
                success: true,
                data: data[0]
            });
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static update = async (req, res) => {
        try {
            const { 
                courseName,
            } = req.body;
    
            const [dataUpdated] = await pool.query('UPDATE interview_question_courses SET ? WHERE interview_question_course_id = ?', [{
                courseName,
            }, req.params.id]);
    
            if (dataUpdated.affectedRows > 0) {
                res.status(200).json({ status: 'success', message: 'Course Updated Successfully' });
            } else {
                res.status(404).json({ status: 'failed', message: 'Course Not Found' });
            }
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static delete = async (req, res) => {
        try {
            const [courseData] = await pool.query('SELECT isDeleted FROM interview_question_courses WHERE interview_question_course_id = ?', [req.params.id]);
            if (courseData.length > 0) {
                const isDeleted = courseData[0].isDeleted == 0 ? 1 : 0;
                const [data] = await pool.query('UPDATE interview_question_courses SET isDeleted = ? WHERE interview_question_course_id = ?', [isDeleted, req.params.id]);

                if (data.affectedRows > 0) {
                    res.status(200).json({ 'status': 'success', 'message': 'Course Deleted Successfully' });
                } else {
                    res.status(500).json({ 'status': 'failed', 'message': 'Internal Server Error' });
                }
            } else {
                res.status(404).json({ 'status': 'failed', 'message': 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }
}

module.exports = InterviewQuestionCourseController;