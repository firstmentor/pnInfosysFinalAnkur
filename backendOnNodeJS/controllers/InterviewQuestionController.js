const pool = require('../db/connectDB')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class InterviewQuestionController {

    static store = async (req, res) => {
        try {
            const { 
                courseId,
                question,  
                answer, 
            } = req.body;

            const [courseData] = await pool.query('SELECT courseName FROM interview_question_courses WHERE interview_question_course_id = ?', [courseId])
            const courseName = courseData[0].courseName
            
            const [dataSaved] = await pool.query('INSERT INTO interview_questions SET ?', {
                courseId,
                courseName,
                question,  
                answer, 
            });

            if (dataSaved.affectedRows > 0) {
                res.status(201).json({ 'status': 'success', 'message': 'Question Added Successfully' });
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchAll = async (req, res) => {
        try {
            
            const [data] = await pool.query('SELECT * FROM interview_questions WHERE courseId = ? ORDER BY interview_question_id DESC', [req.params.id]);
    
            res.status(200).json({
                success: true,
                data
            });
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static fetchByCourseId = async (req, res) => {
        try {
            const [data] = await pool.query('SELECT * FROM interview_questions WHERE courseid = ?', [req.params.id]);

            res.status(200).json({
                success: true,
                data
            });
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchSingle = async (req, res) => {
        try {
            const [data] = await pool.query('SELECT * FROM interview_questions WHERE interview_question_id = ?', [req.params.id]);

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
                question,  
                answer,  
            } = req.body;
    
            const [dataUpdated] = await pool.query('UPDATE interview_questions SET ? WHERE interview_question_id = ?', [{
                question,  
                answer, 
            }, req.params.id]);
    
            if (dataUpdated.affectedRows > 0) {
                res.status(200).json({ status: 'success', message: 'Question Updated Successfully' });
            } else {
                res.status(404).json({ status: 'failed', message: 'Course Not Found' });
            }
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static delete = async (req, res) => {
        try {
            const [questionData] = await pool.query('SELECT isDeleted FROM interview_questions WHERE interview_question_id = ?', [req.params.id]);
            if (questionData.length > 0) {
                const isDeleted = questionData[0].isDeleted == 0 ? 1 : 0;
                const [data] = await pool.query('UPDATE interview_questions SET isDeleted = ? WHERE interview_question_id = ?', [isDeleted, req.params.id]);

                if (data.affectedRows > 0) {
                    res.status(200).json({ 'status': 'success', 'message': 'Question Deleted Successfully' });
                } else {
                    res.status(500).json({ 'status': 'failed', 'message': 'Internal Server Error' });
                }
            } else {
                res.status(404).json({ 'status': 'failed', 'message': 'Question not found' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }
}

module.exports = InterviewQuestionController;