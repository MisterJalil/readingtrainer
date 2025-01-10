import Axios from 'axios';
import RegisterValidations from '../../../services/RegisterValidations';
import LoginValidations from '../../../services/LoginValidations';
import {
    REG_AUTH_ACTION,
    AUTH_ACTION,
    LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    SIGNUP_ACTION,
    AUTO_LOGOUT_ACTION,
    SET_AUTO_LOGOUT_MUTATION,
} from '../../storeconstants';

let timer = '';
export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        });
        localStorage.removeItem('userData');
        if (timer) {
            clearTimeout(timer);
        }
    },

    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION);
        context.commit(SET_AUTO_LOGOUT_MUTATION);
    },

    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4fee1MJhsn7GFTybwPXJZkrKrP4bHJZ4`,
        });
    },

    async [SIGNUP_ACTION](context, payload) {
        return context.dispatch(REG_AUTH_ACTION, {
            ...payload,
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4fee1MJhsn7GFTybwPXJZkrKrP4bHJZ4`,
        });
    },

    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem('userData');

        if (userDataString) {
            let userData = JSON.parse(userDataString);
            let expirationTime = userData.expiresIn - new Date().getTime();

            if (expirationTime < 10000) {
                context.dispatch(AUTO_LOGOUT_ACTION);
            } else {
                timer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION);
                }, expirationTime);
            }

            context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
        }
    },

    async [AUTH_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = '';
        try {
            response = await Axios.post(payload.url, postData);
        } catch (err) {
            // context.commit(LOADING_SPINNER_SHOW_MUTATION, false, {
            //     root: true,
            // });
            let errorMessage = LoginValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message,
            );
            throw errorMessage;
        }

        if (response.status === 200) {
            let expirationTime = +response.data.expiresIn * 1000;

            /*timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION);
            }, expirationTime);*/

            let tokenData = {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: expirationTime,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            };
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
        }
    },
    async [REG_AUTH_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = '';
        try {
            response = await Axios.post(payload.url, postData);
        } catch (err) {
            // context.commit(LOADING_SPINNER_SHOW_MUTATION, false, {
            //     root: true,
            // });
            let errorMessage = RegisterValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message,
            );
            throw errorMessage;
        }
        if (response.status === 200) {
            let expirationTime = +response.data.expiresIn * 1000;

            /*timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION);
            }, expirationTime);
            
            let tokenData = {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: expirationTime,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            };
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);*/
            
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            token: null,
            expiresIn: expirationTime,
            refreshToken: null,
            userId: null,
        });
        localStorage.removeItem('userData');
        if (timer) {
            clearTimeout(timer);
        }

        }
    },
};