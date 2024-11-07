const pool = require('../db/connectDB')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class CourseController {

    static store = async (req, res) => {
        try {
            const { 
                courseName,
                fees,  
                duration,  
                startingDate, 
            } = req.body;

            const courseBanner = req.files.courseBanner;
            const uploadResult = await cloudinary.uploader.upload(courseBanner.tempFilePath, {
                folder: 'pnInfosysImages'
            });
            const courseBannerPublicId = uploadResult.public_id;
            const courseBannerUrl = uploadResult.secure_url;
            
            const [dataSaved] = await pool.query('INSERT INTO courses SET ?', {
                courseName,
                fees,  
                duration,  
                startingDate,
                courseBannerPublicId,
                courseBannerUrl
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
            
            const [data] = await pool.query('SELECT * FROM courses ORDER BY course_id DESC');
    
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
            const [data] = await pool.query('SELECT * FROM courses WHERE course_id = ?', [req.params.id]);

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
                fees, 
                duration, 
                startingDate 
            } = req.body;
    
            const [existingCourse] = await pool.query('SELECT courseBannerPublicId, courseBannerUrl FROM courses WHERE course_id = ?', [req.params.id]);
    
            if (!existingCourse.length) {
                return res.status(404).json({ status: 'failed', message: 'Course Not Found' });
            }
    
            let courseBannerPublicId = existingCourse[0].courseBannerPublicId;
            let courseBannerUrl = existingCourse[0].courseBannerUrl;
    
            if (req.files && req.files.courseBanner) {
                const courseBanner = req.files.courseBanner;
    
                const uploadResult = await cloudinary.uploader.upload(courseBanner.tempFilePath, {
                    folder: 'pnInfosysImages'
                });
    
                courseBannerPublicId = uploadResult.public_id;
                courseBannerUrl = uploadResult.secure_url;
    
                if (existingCourse[0].courseBannerPublicId) {
                    await cloudinary.uploader.destroy(existingCourse[0].courseBannerPublicId);
                }
            }
    
            const [dataUpdated] = await pool.query('UPDATE courses SET ? WHERE course_id = ?', [{
                courseName, 
                fees, 
                duration, 
                startingDate, 
                courseBannerPublicId, 
                courseBannerUrl
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
            const [courseData] = await pool.query('SELECT isDeleted FROM courses WHERE course_id = ?', [req.params.id]);
            if (courseData.length > 0) {
                const isDeleted = courseData[0].isDeleted == 0 ? 1 : 0;
                const [data] = await pool.query('UPDATE courses SET isDeleted = ? WHERE course_id = ?', [isDeleted, req.params.id]);

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

module.exports = CourseController;