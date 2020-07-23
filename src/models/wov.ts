import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const WOVSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    profession: String,
    city: String,
    cellGroup: String,
    satellite: String,
    idNumberpassport: String,
    country: String,
    dateOfBirth: Date,
    phoneNumbers: [String],
    phoneNumber: String,
    nextOfKin: String,
    preferredSubscriptionmonth: String,
    currency: String,
    nokPhoneNumber: String,
    fullName: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

WOVSchema.plugin(mongoosePaginate);
const WOV = mongoose.model('WOV', WOVSchema);

export default WOV;