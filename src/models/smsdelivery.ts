import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SmsDeliverySchema = new mongoose.Schema({
    message: String,
    recipientName: String,
    recipientId: String,
    recipientType: String,
    phoneNumber: String,
}, {
    timestamps: true
});

SmsDeliverySchema.plugin(mongoosePaginate);
const SmsDelivery = mongoose.model('SmsDelivery', SmsDeliverySchema);

export default SmsDelivery;