import { Request, Response, NextFunction } from 'express';
import { setActionData, sanitizePhoneNumber } from '../functions/general';
import { systemError } from '../functions/errors';
import { FindOptions } from '../properties';
import YOI from '../models/yoi';

export const getYOIs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options = new FindOptions(req.query);
        let YOIs = await YOI.paginate(
            { fullName: options.query },
            {
                limit: options.limit,
                page: options.page,
                sort: { [options.sortBy]: options.order },
            }
        );
        setActionData(res, YOI, '');
        res.json(YOIs);
    } catch (e) {
        next(systemError(e.message));
    }
}