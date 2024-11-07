const pool = require('../db/connectDB')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class CertificateController {

    static store = async (req, res) => {
        try {
            const { 
                studentName,
                course,  
                duration
            } = req.body;

            const studentImage = req.files.studentImage;
            const uploadResult = await cloudinary.uploader.upload(studentImage.tempFilePath, {
                folder: 'pnInfosysImages'
            });
            const studentImagePublicId = uploadResult.public_id;
            const studentImageUrl = uploadResult.secure_url;
            
            const [dataSaved] = await pool.query('INSERT INTO certificates SET ?', {
                studentName,
                course,  
                duration,
                studentImagePublicId,
                studentImageUrl
            });

            if (dataSaved.affectedRows > 0) {
                res.status(201).json({ 'status': 'success', 'message': 'Certificate Added Successfully' });
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchAll = async (req, res) => {
        try {
            
            const [data] = await pool.query('SELECT * FROM certificates ORDER BY certificate_id DESC');
    
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
            const [data] = await pool.query('SELECT * FROM certificates WHERE certificate_id = ?', [req.params.id]);

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
                studentName,
                course,  
                duration 
            } = req.body;
    
            const [existingCourse] = await pool.query('SELECT studentImagePublicId, studentImageUrl FROM certificates WHERE certificate_id = ?', [req.params.id]);
    
            if (!existingCourse.length) {
                return res.status(404).json({ status: 'failed', message: 'Certificate Not Found' });
            }
    
            let studentImagePublicId = existingCourse[0].studentImagePublicId;
            let studentImageUrl = existingCourse[0].studentImageUrl;
    
            if (req.files && req.files.studentImage) {
                const studentImage = req.files.studentImage;
    
                const uploadResult = await cloudinary.uploader.upload(studentImage.tempFilePath, {
                    folder: 'pnInfosysImages'
                });
    
                studentImagePublicId = uploadResult.public_id;
                studentImageUrl = uploadResult.secure_url;
    
                if (existingCourse[0].studentImagePublicId) {
                    await cloudinary.uploader.destroy(existingCourse[0].studentImagePublicId);
                }
            }
    
            const [dataUpdated] = await pool.query('UPDATE certificates SET ? WHERE certificate_id = ?', [{
                studentName,
                course,  
                duration, 
                studentImagePublicId, 
                studentImageUrl
            }, req.params.id]);
    
            if (dataUpdated.affectedRows > 0) {
                res.status(200).json({ status: 'success', message: 'Certificate Updated Successfully' });
            } else {
                res.status(404).json({ status: 'failed', message: 'Certificate Not Found' });
            }
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static delete = async (req, res) => {
        try {
            const [certificateData] = await pool.query('SELECT isDeleted FROM certificates WHERE certificate_id = ?', [req.params.id]);
            if (certificateData.length > 0) {
                const isDeleted = certificateData[0].isDeleted == 0 ? 1 : 0;
                const [data] = await pool.query('UPDATE certificates SET isDeleted = ? WHERE certificate_id = ?', [isDeleted, req.params.id]);

                if (data.affectedRows > 0) {
                    res.status(200).json({ 'status': 'success', 'message': 'Certificate Deleted Successfully' });
                } else {
                    res.status(500).json({ 'status': 'failed', 'message': 'Internal Server Error' });
                }
            } else {
                res.status(404).json({ 'status': 'failed', 'message': 'Certificate not found' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }
}

module.exports = CertificateController;