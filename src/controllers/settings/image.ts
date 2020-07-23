import { Request, Response, NextFunction } from "express";
import { systemError, formError } from "../../functions/errors";
import { ImageSettingForm } from "../../forms";
import { ImageSetting } from "../../models";
import { FindOptions } from "../../properties";
import { getImageSettingFromDb, sanitizeImageUpdateData } from "../../functions/image-settings";
import { setActionData } from "../../functions/general";

export const addImageSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageSettingForm = new ImageSettingForm({ ...req.body, publicDir: req.app.locals.publicDir, createdBy: req.user._id });
        if (imageSettingForm.isValid()) {
            let imageSetting = new ImageSetting(imageSettingForm.data);
            await imageSetting.save();
            setActionData(res, ImageSetting, imageSetting._id);
            res.status(201).json(imageSetting);
        } else {
            next(formError(imageSettingForm.errors));
        }
    } catch (e) {
        if (e.code == 11000) {
            next(systemError(`Image setting for model "${req.body.model}" already exists.`, 406));
        } else {
            next(systemError(e.message));
        }
    }
}

export const getImageSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options = new FindOptions(req.query);
        let imageSettings = await ImageSetting.paginate(
            { model: options.query },
            {
                limit: options.limit,
                page: options.page,
                sort: { [options.sortBy]: options.order },
            }
        );
        setActionData(res, ImageSetting, '');
        res.json(imageSettings);
    } catch (e) {
        next(systemError(e.message));
    }
}

export const getImageSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageSetting = await getImageSettingFromDb(req.params.id);
        if (imageSetting) {
            setActionData(res, ImageSetting, imageSetting._id);
            res.json(imageSetting);
        } else {
            next(systemError('Image setting not found.', 404));
        }
    } catch (e) {
        next(systemError(e.message));
    }
}

export const updateImageSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        let data = sanitizeImageUpdateData(req.body);
        const update = await ImageSetting.updateOne({ _id: id }, { $set: data });
        if (update.nModified == 1) {
            const updatedImageSetting = await getImageSettingFromDb(id);
            setActionData(res, ImageSetting, id);
            res.json(updatedImageSetting);
        } else {
            next(systemError('Image setting failed to update. Please try again later.', 406));
        }
    } catch (e) {
        next(systemError(e.message));
    }
}

export const deleteImageSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedImageSetting = await getImageSettingFromDb(id);
        const update = await ImageSetting.deleteOne({ _id: id });
        if (update.deletedCount == 1) {
            setActionData(res, ImageSetting, id);
            res.json(deletedImageSetting);
        } else {
            next(systemError('Image setting not available.', 406));
        }
    } catch (e) {
        next(systemError(e.message));
    }
}