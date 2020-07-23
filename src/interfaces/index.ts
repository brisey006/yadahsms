export interface FormError {
    field: string,
    message: string
}

export interface ResponseError extends Error {
    status?: number;
}

export interface Image {
    original: string,
    thumbnail: string,
    cropped: string
}

export interface UserResult {
    image: Image,
    temporaryPassword: boolean,
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    userRole: string,
    gender: string,
    dateOfBirth: Date,
    country: string,
    createdBy: string,
    address: string,
    phoneNumber: string,
    bio: string,
    createdAt: Date,
    updatedAt: Date
}

export default {}