import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ImageSettingSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    crop: Boolean,
    croppedPath: String,
    originalPath: String,
    thumbnailPath: String,
    aspectRatio: [Number],
    maxSize: Number,
    thumbnailWidth: Number,
    croppedWidth: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

ImageSettingSchema.plugin(mongoosePaginate);
const ImageSetting = mongoose.model('ImageSetting', ImageSettingSchema);

export default ImageSetting;