import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName,
        email,
        password: hashPassword,
    });
    try {
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'));
        if (!await bcrypt.compare(password, validUser.password))
            return next(errorHandler(401, 'Wrong credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(validUser);

        const { password: hashPassword, ...rest } = validUser._doc;
        const expireDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, { httpOnly: true, expires: expireDate }).
            status(200).json({
                message: 'User signed in successfully',
                ...rest
            });
    } catch (error) {
        next(error);
    }
};
