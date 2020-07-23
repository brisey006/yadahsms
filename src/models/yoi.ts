import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const YOISchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    occupation: String,
    address: String,
    city: String,
    cellGroup: String,
    country: String,
    satellite: String,
    dateOfBirth: Date,
    contactNumber: String,
    phoneNumbers: [String],
    nextOfKin: String,
    nokPhoneNumber: String,
    fullName: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

YOISchema.plugin(mongoosePaginate);
const YOI = mongoose.model('YOI', YOISchema);

export default YOI;