import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MWPSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profession: String,
    address: String,
    city: String,
    cellGroup: String,
    idNumberpassport: String,
    country: String,
    phoneNumbers: [String],
    satellite: String,
    dateOfBirth: Date,
    contactNumber: String,
    nextOfKin: String,
    preferredSubscriptionmonth: String,
    currency: String,
    nokPhoneNumber: String,
    fullName: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

MWPSchema.plugin(mongoosePaginate);
const MWP = mongoose.model('MWP', MWPSchema);

export default MWP;