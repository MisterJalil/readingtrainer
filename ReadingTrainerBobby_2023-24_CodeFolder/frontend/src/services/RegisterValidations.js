
import Validations from './Validations';

export default class RegisterValidations {
    constructor(email, password, password_confirm) {
        this.email = email;
        this.password = password;
        this.password_confirm = password_confirm;
    }

    checkValidations() {
        let errors = [];

        //email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        //password Validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'password should be of 6 characters';
        }

        //password confirm Validations
        if (!Validations.matchCheck(this.password, this.password_confirm)) {
            errors['password'] = 'passwords do not match';
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            default:
                return 'Unexpected error occurred. Please try again';
        }
    }
}
