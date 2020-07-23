import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

TagSchema.plugin(mongoosePaginate);
const Tag = mongoose.model('Tag', TagSchema);

export default Tag;