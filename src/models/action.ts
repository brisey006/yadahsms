import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ActionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    path: String,
    documentId: String,
    method: {
        type: String,
        required: true,
        index: true
    },
    status: Number,
    dataCollection: String,
    data: String
}, {
    timestamps: true
});

ActionSchema.plugin(mongoosePaginate);
const Action = mongoose.model('Action', ActionSchema);

export default Action;