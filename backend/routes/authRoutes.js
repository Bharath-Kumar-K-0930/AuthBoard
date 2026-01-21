const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    registerUser,
    loginUser,
    getMe,
    updateDetails,
    uploadPhoto,
    changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.NODE_ENV === 'production' ? '/tmp' : 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'user-' + req.user.id + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.post('/upload-photo', protect, upload.single('photo'), uploadPhoto);
router.put('/change-password', protect, changePassword);

module.exports = router;
