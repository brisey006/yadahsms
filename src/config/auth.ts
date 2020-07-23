import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { getToken } from "../functions/users";
import { systemError } from '../functions/errors';
import { SUPER_ADMIN } from '../config/roles';

import { User } from '../models';
import { UserResult } from '../interfaces';

interface AuthData {
    id: string,
    role: string,
    exp: number,
    iat: number
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getToken(req);
        if (token) {
            const authData: AuthData = jwt.verify(token as string, process.env.JWT_KEY as string) as AuthData;
            const user = await User.findOne({ _id: authData.id });
            if (user) {
                req.user = user._doc;
                next();
            } else {
                next(systemError('Access token used is invalid.', 403));
            }
        } else {
            next(systemError('Access token needed to access this route.', 403));
        }
    } catch (e) {
        next(systemError(e.message, 403));
    }
}

export const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as UserResult;
        if (user.userRole == SUPER_ADMIN) {
            next();
        } else {
            next(systemError('Only a super admin can access this area.', 401));
        }
    } catch (e) {
        next(systemError(e.message, 403));
    }
}