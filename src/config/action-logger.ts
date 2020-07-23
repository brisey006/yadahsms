import { Request, Response, NextFunction, response } from "express";
import onFinished from 'on-finished';
import { Action } from '../models';
import { systemError } from "../functions/errors";

export const actionLogger = (req: Request, res: Response, next: NextFunction) => {
    onFinished(res, async () => {
        try {
            if (res.statusCode != 404) {
                if (req.user) {
                    let data;
                    data = { 
                        user: req.user._id, 
                        path: req.originalUrl, 
                        method: req.method, 
                        dataCollection: res.locals.model, 
                        documentId: res.locals.documentId,
                        status: res.statusCode
                    };
                    if (req.method == 'POST' || req.method == 'PUT') {
                        data = { ...data, data: JSON.stringify(req.body) };
                    }
                    const action = new Action(data);
                    await action.save();
                }
            }
        } catch (e) {
            next(systemError(e.message));
        }
    });
    next();
}