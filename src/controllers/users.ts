import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserForm, LoginForm } from '../forms';
import { formError, systemError } from '../functions/errors';

import { User } from '../models';

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userForm = new UserForm(req.body);
        if (userForm.isValid()) {
            userForm.hashPassword();
            const user = new User(userForm.data);
            await user.save();
            res.json(user);
        } else {
            next(formError(userForm.errors));
        }
    } catch (e) {
        next(systemError(e.message));
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginForm = new LoginForm(req.body);
        const errorMsg = systemError('Email or password is incorrect.');
        if (loginForm.isValid()) {
            const user = (await User.findOne({ email: loginForm.email }))._doc;
            if (!user) {
                next(errorMsg);
            } else {
                let isCorrect: boolean = bcrypt.compareSync(loginForm.password, user.password);
                if (isCorrect) {
                    const token: string = jwt.sign({
                        id: user._id,
                        role: user.userRole,
                        lastLogin: Date.now,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                    }, process.env.JWT_KEY as string);
                    delete user.password;
                    res.json({ ...user, token });
                } else {
                    next(errorMsg);
                }
            }
        } else {
            next(formError(loginForm.errors));
        }
    } catch (e) {
        next(systemError(e.message));
    }
}