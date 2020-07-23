import { FormError } from "../interfaces";
import { aspectRatioArray, createOriginalFolder, createCroppedFolder, createThumbnailFolder } from "../functions/image-settings";

export default class ImageSettingForm {
    private _errors: FormError[] = [];

    model: string;
    crop: boolean;
    originalPath: string;
    croppedPath: string;
    thumbnailPath: string;
    aspectRatio: number[];
    maxSize: number;
    thumbnailWidth: number;
    croppedWidth: number;
    createdBy: string;

    get data() {
        return {
            model: this.model,
            crop: this.crop,
            originalPath: this.originalPath,
            croppedPath: this.croppedPath,
            thumbnailPath: this.thumbnailPath,
            aspectRatio: this.aspectRatio,
            maxSize: this.maxSize,
            thumbnailWidth: this.thumbnailWidth,
            croppedWidth: this.croppedWidth,
            createdBy: this.createdBy
        }
    }

    get errors(): FormError[] {
        return this._errors;
    }

    constructor({ model, crop, aspectRatio, maxSize, thumbnailWidth, croppedWidth, createdBy, publicDir } :
    { model: string, crop: boolean, aspectRatio: string, maxSize: number, thumbnailWidth: number, croppedWidth: number, createdBy: string, publicDir: string }){
        this.model = model;
        this.crop = crop;
        this.aspectRatio = aspectRatioArray(aspectRatio);
        this.maxSize = maxSize;
        this.thumbnailWidth = thumbnailWidth;
        this.croppedWidth = croppedWidth;
        this.originalPath = createOriginalFolder(model, publicDir);
        this.croppedPath = createCroppedFolder(model, publicDir);
        this.thumbnailPath = createThumbnailFolder(model, publicDir);
        this.createdBy = createdBy;
    }

    //Validate form
    public isValid(): boolean {
        const errors: FormError[] = [];

        if (!this.model) {
            errors.push({ field: 'model', message: 'Model is required.' });
        }

        if (this.crop == undefined) {
            errors.push({ field: 'crop', message: 'Crop is required.' });
        }

        if (this.aspectRatio.length == 0) {
            errors.push({ field: 'aspectRatio', message: 'Aspect ratio is required.' });
        }

        if (!this.maxSize) {
            errors.push({ field: 'maxSize', message: 'Maximum image size is required.' })
        }

        if (!this.thumbnailWidth) {
            errors.push({ field: 'thumbnailWidth', message: 'Thumbnail width is required.' });
        }

        if (!this.croppedWidth) {
            errors.push({ field: 'croppedWidth', message: 'Cropped width is required.' });
        }

        if (errors.length > 0) {
            this._errors = errors;
            return false;
        } else {
            this._errors = [];
            return true;
        }
    }
}