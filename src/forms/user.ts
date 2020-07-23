import { FormError } from '../interfaces';
import roles from '../config/roles';
import bcrypt from 'bcryptjs';

export default class UserForm {
    private _errors: FormError[] = [];

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    userRole: string;
    
    get errors(): FormError[] {
        return this._errors;
    }

    get data() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email,
            password: this.password,
            userRole: this.userRole
        };
    }
    
    constructor( { firstName, lastName, email, password, passwordConfirmation, userRole } : 
        { firstName: string, lastName: string, email: string, password: string, passwordConfirmation: string, userRole: string }) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.userRole = userRole;
    }

    //Validate Form
    public isValid(): boolean {
        const errors: FormError[] = [];
        const { firstName, lastName, email, password, passwordConfirmation, userRole } = this;

        //Validating first name
        if (!firstName) {
            errors.push({ field: 'firstName', message: 'First name is required.' });
        }

        //Validating last name
        if (!lastName) {
            errors.push({ field: 'lastName', message: 'Last name is required.' });
        }

        //Validating email address
        if (!email) {
            errors.push({ field: 'email', message: 'Email is required.' });
        } else {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                errors.push({ field: 'email', message: 'Email provided is invalid.' });
            }
        }

        //Validating password
        if (!password) {
            errors.push({ field: 'password', message: 'Password is required.' });
        } else {
            if (password.length < 6) {
                errors.push({ field: 'password', message: 'Password must be 6 or more characters.' });
            }
        }

        //Validating password confirmation
        if (!passwordConfirmation) {
            errors.push({ field: 'passwordConfirmation', message: 'Password confirmation is required.' });
        } else {
            if (password != passwordConfirmation) {
                errors.push({ field: 'password', message: 'Passwords do not match.' });
            }
        }

        //Validating user type
        if (!userRole) {
            errors.push({ field: 'userRole', message: 'User role is required.' });
        } else {
            if (roles.data.indexOf(userRole) == -1) {
                errors.push({ field: 'userRole', message: 'User role provided not available in the system.' });
            }
        }
        
        if (errors.length > 0) {
            this._errors = errors;
            return false;
        } else {
            this._errors = [];
            return true;
        }
    }

    public hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
}