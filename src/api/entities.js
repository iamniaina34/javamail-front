import api from './api'

const User = api('/users')
const Logger = api('/users/login')
const Email = () => {
    return({
        sendPinCode: api('/sendPinCode')
    })
}
export { User, Logger, Email }