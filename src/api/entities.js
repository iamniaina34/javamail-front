import api from './api';

const User = api('/users');
const Logger = api('/users/login');
const Registerer = api('/users/register');

const Email = {
    sendPinCode: (body) => api('/email/sendPinCodeEmail').post(body),
    confirmPinCode: (body) => api('/email/confirmPinCodeEmail').post(body)
};

export { User, Logger, Email, Registerer };