import api from './api'

const User = api('/users')
const Logger = api('/users/login')
export { User, Logger }