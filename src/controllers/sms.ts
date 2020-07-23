import { Request, Response, NextFunction } from "express";
import { systemError } from "../functions/errors";
import { setActionData } from "../functions/general";
import { FindOptions } from "../properties";
import SmsDelivery from "../models/smsdelivery";
import SmsDeliveryForm from "../forms/sms-delivery";

export const addDeliveryNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const smsForm = new SmsDeliveryForm(req.body);
        const smsDelivery = new SmsDelivery(smsForm.data);
        await smsDelivery.save();
        setActionData(res, SmsDelivery, '');
        res.json(smsDelivery);
    } catch (e) {
        next(systemError(e.message));
    }
}