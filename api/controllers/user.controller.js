import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
export const test = (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
};

//update User

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your account"));
    }
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error);
    }
};
