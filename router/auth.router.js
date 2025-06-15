const express = require('express');
const Joi = require('joi');
const User = require('../models/User'); // Adjust path as needed
const router = express.Router();
const jwt = require('jsonwebtoken');


// Joi schema for signup validation
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(), // Basic email validation
    password: Joi.string().min(6).required()
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    // 1. Validate request body
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        // 2. Check if user already exists (username or email)
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // 3. Create new user (password will be hashed by pre-save hook in User model)
        user = new User({
            username,
            email,
            password
        });

        // 4. Save the new user in MongoDB
        await user.save();

        // 5. Return success response (consider not sending back the whole user object or at least omitting password)
        res.status(201).json({ message: 'User registered successfully', userId: user._id });

    } catch (err) {
        console.error(err.message);
        // Check for Mongoose duplicate key errors (though the check above should catch most)
        if (err.code === 11000) {
             return res.status(400).json({ message: 'Email or username already exists.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Joi schema for signin validation
const signinSchema = Joi.object({
    login: Joi.string().required(), // Can be username or email
    password: Joi.string().required()
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
    // 1. Validate request body
    const { error } = signinSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { login, password } = req.body;

    try {
        // 2. Verify user exists (by username or email)
        const user = await User.findOne({
            $or: [{ email: login }, { username: login }]
        }).select('+password'); // Explicitly select password as it's not selected by default if schema has select: false

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 3. Use bcrypt.compare to verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 4. If valid, generate a JWT token
        const payload = {
            user: {
                id: user.id,
                username: user.username
                // Add other non-sensitive user info if needed
            }
        };

        // Ensure you have a JWT_SECRET in your environment variables
        const jwtSecret = process.env.JWT_SECRET || 'yourDefaultSecretKey'; // Fallback for development only
        if (jwtSecret === 'yourDefaultSecretKey' && process.env.NODE_ENV === 'production') {
            console.warn('Warning: Using default JWT secret in production!');
        }


        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' }, // Token expiration (e.g., 1 hour, 7d for 7 days)
            (err, token) => {
                if (err) throw err;
                res.json({
                    message: 'Login successful',
                    token,
                    user: { // Optionally return some user info (never the password)
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;