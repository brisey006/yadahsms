import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        index: true
    },
    bio: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    phoneNumber: String,
    image: {
        original: String,
        thumbnail: String,
        cropped: String
    },
    gender: String,
    userRole: String,
    hashId: String,
    dateOfBirth: Date,
    country: String,
    temporaryPassword: {
        type: Boolean,
        default: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

export default User;