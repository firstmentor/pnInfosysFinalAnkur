const pool = require('../db/connectDB')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class ContactMessageController {

    static store = async (req, res) => {
        try {
            const { 
                name,
                email,  
                number, 
                message, 
            } = req.body;
            
            const [dataSaved] = await pool.query('INSERT INTO contact_messages SET ?', {
                name,
                email,  
                number, 
                message,
            });

            if (dataSaved.affectedRows > 0) {
                res.status(201).json({ 'status': 'success', 'message': 'Message Added Successfully' });
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchAll = async (req, res) => {
        try {
            
            const [data] = await pool.query('SELECT * FROM contact_messages ORDER BY contact_message_id DESC');
    
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
            const [data] = await pool.query('SELECT * FROM contact_messages WHERE contact_message_id = ?', [req.params.id]);

            res.status(200).json({
                success: true,
                data: data[0]
            });
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }
}

module.exports = ContactMessageController;