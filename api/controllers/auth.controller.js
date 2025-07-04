import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
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
