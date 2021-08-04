import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    pageSize: 0,
    isLoading: false,
    error: false,
    message: null,
}


export const train = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.POST_TRAIN_START:
            return {
                isLoading: true
            }
        case actionTypes.POST_TRAIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.msg
            }
        case actionTypes.POST_TRAIN_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
                
                
            }
        case actionTypes.POST_TRAIN_REFRESH:
            return {
                
            }
        case actionTypes.GET_TRAIN_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_TRAIN_SUCCESS:
            return {
                isLoading: false,
                data: action.payload.train,
                error: null,
                message: action.payload.msg,
                pageSize: action.payload.pageSize
            }
        case actionTypes.GET_TRAIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload
            }
        case actionTypes.DESTROY_TRAIN_START:
            return {
                isLoading: true
            }
        case actionTypes.DESTROY_TRAIN_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
            }
        case actionTypes.DESTROY_TRAIN_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
            }
        case actionTypes.DESTROY_TRAIN_REFRESH:
            return {
            
            }
        case actionTypes.AMEND_TRAIN_START:
            return {
                isLoading: true
            }
        case actionTypes.AMEND_TRAIN_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
            }
        case actionTypes.AMEND_TRAIN_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
            }
        case actionTypes.AMEND_TRAIN_REFRESH:
            return {
               
            }
        default:
            return state;
            }
}

export default train;


