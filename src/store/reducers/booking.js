import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    pageSize: 0,
    isLoading: false,
    error: false,
    message: ''
}


export const booking = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TRAIN_BOOKING_START:
            return {
                isLoading: true
            }
        case actionTypes.TRAIN_BOOKING_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload
            }
        case actionTypes.TRAIN_BOOKING_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload
            }
        case actionTypes.TRAIN_BOOKING_REFRESH:
            return {
            }
        case actionTypes.DESTROY_TRAIN_TICKET_START:
            return {
                isLoading: true
            }
        case actionTypes.DESTROY_TRAIN_TICKET_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
            }
        case actionTypes.DESTROY_TRAIN_TICKET_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload
            }
        case actionTypes.DESTROY_TRAIN_TICKET_REFRESH:
            return {
            }
        case actionTypes.GET_TRAIN_TICKET_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_TRAIN_TICKET_SUCCESS:
            return {
                isLoading: false,
                data: action.payload.payment,
                pageSize: action.payload.pageSize
                
            }
        case actionTypes.GET_TRAIN_TICKET_FAIL:
            return {
                isLoading: false,
                error: true
            }
        default:
            return state;
            }
}

export default booking;


