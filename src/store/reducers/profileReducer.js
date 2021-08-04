import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    pageSize: 0,
    isLoading: false,
    error: false,
    show: true,
}


export const profile = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AMEND_PROFILE_START:
            return {
                isLoading: true
            }
        case actionTypes.AMEND_PROFILE_SUCCESS:
            return {
                isLoading: false,
                error: false,
                show: true,
                data: action.payload.data,
                message: { ...state.message, ...action.payload.data.message }
            }
        case actionTypes.AMEND_PROFILE_FAIL:
            return {
                isLoading: false,
                error: true,
                show: true,
                data: {...state.data},
                message: { ...state.message, ...action.payload }
                
            }
        default:
            return state;
            }
}

export default profile;


