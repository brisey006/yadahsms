import { FormError } from '../interfaces';

export default class SmsDeliveryForm {
    private _errors: FormError[] = [];

    message: string;
    recipientName: string;
    recipientId: string;
    recipientType: string;
    phoneNumber: string;
    
    get errors(): FormError[] {
        return this._errors;
    }

    get data() {
        return {
            message: this.message,
            recipientName: this.recipientName,
            recipientId: this.recipientId,
            recipientType: this.recipientType,
            phoneNumber: this.phoneNumber
        };
    }
    
    constructor( { message, recipientName, recipientId, recipientType, phoneNumber } : 
        { message: string, recipientName: string, recipientId: string, recipientType: string, phoneNumber: string }) {
        this.message = message;
        this.recipientName = recipientName;
        this.recipientId = recipientId;
        this.recipientType = recipientType;
        this.phoneNumber = phoneNumber;
    }
}