import { Request, Response, NextFunction } from 'express';
import { setActionData, sanitizePhoneNumber } from '../functions/general';
import { systemError } from '../functions/errors';
import { FindOptions } from '../properties';
import WOV from '../models/wov';

export const getAllWOV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options = new FindOptions(req.query);
        let wovs = await WOV.paginate(
            {  },
            {
                limit: options.limit,
                page: options.page,
                sort: { [options.sortBy]: options.order },
            }
        );
        // for (let a of wovs.docs) {
        //     const rawNumber: string = a.phoneNumber;
        //     const u = await WOV.updateOne({ _id: a._id }, { $set: { phoneNumbers: sanitizePhoneNumber(rawNumber) } });
        //     console.log(u);
        // }
        setActionData(res, WOV, '');
        res.json(wovs);
    } catch (e) {
        next(systemError(e.message));
    }
}