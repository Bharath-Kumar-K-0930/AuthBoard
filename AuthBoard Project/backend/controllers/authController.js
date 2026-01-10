const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password (handled in model pre-save, but creating here triggers it?)
    // Actually model pre-save handles hashing if we just create user.
    // Wait, the model code I wrote uses `pre('save')`.
    // `User.create` triggers save. So we pass plain password.

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
const updateDetails = async (req, res) => {
    const fieldsToUpdate = {};
    if (req.body.name) fieldsToUpdate.name = req.body.name;
    if (req.body.email) fieldsToUpdate.email = req.body.email;

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    }).select('-password');

    res.status(200).json(user);
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Upload profile photo
// @route   POST /api/auth/upload-photo
// @access  Private
const uploadPhoto = async (req, res) => {
    console.log('Upload Request Body:', req.body);
    console.log('Upload Request File:', req.file);
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a file');
    }

    const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user.id, { profilePhoto: photoUrl }, {
        new: true,
    }).select('-password');

    res.status(200).json(user);
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (user && (await user.matchPassword(oldPassword))) {
        user.password = newPassword; // Will be hashed by pre-save middleware
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } else {
        res.status(400);
        throw new Error('Invalid old password');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateDetails,
    uploadPhoto,
    changePassword,
};
