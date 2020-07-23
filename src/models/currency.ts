import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CurrencySchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: String,
    symbol: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

CurrencySchema.plugin(mongoosePaginate);
const Currency = mongoose.model('Currency', CurrencySchema);

export default Currency;