import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    token: null,
    modules: {},
    message: null,
    isLoading: false,
    isLoggedIn: false,
    isLoggedOut: false
}


export const isAuthenticated = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                isLoading: true,
                isLoggedIn: false
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                error: false,
                data: action.payload.user,
                token: action.payload.token,
                message: action.payload.msg 
            }
        case actionTypes.AUTH_FAIL:
            return {

                isLoading: false,
                isLoggedIn: false,
                error: true,
                message: action.payload
            }
        case actionTypes.AUTH_REFRESH:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                isLoggedOut: false,
            }
       case actionTypes.LOG_OUT:
            return {
                isLoading: false,
                isLoggedIn: false,
                isLoggedOut: true
            }
        case actionTypes.SIGNUP_START:
            return {
                isLoading: true,
                isLoggedIn: false
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                error: false,
                data: action.payload.user,
                token: action.payload.token,
                message: action.payload.msg 
            }
        case actionTypes.SIGNUP_FAIL:
            return {

                isLoading: false,
                isLoggedIn: false,
                error: true,
                message: action.payload
            }
        case actionTypes.SIGNUP_REFRESH:
            return {
            }
        default:
            return state;
            }
}

export default isAuthenticated;


