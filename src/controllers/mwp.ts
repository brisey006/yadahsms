import { Request, Response, NextFunction } from 'express';
import { setActionData, sanitizePhoneNumber } from '../functions/general';
import { systemError } from '../functions/errors';
import { FindOptions } from '../properties';
import MWP from '../models/mwp';

export const getAllMWP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options = new FindOptions(req.query);
        let mwps = await MWP.paginate(
            { fullName: options.query },
            {
                limit: options.limit,
                page: options.page,
                sort: { [options.sortBy]: options.order },
            }
        );
        setActionData(res, MWP, '');
        res.json(mwps);
    } catch (e) {
        next(systemError(e.message));
    }
}