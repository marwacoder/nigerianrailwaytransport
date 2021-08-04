import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    pageSize: 0,
    isLoading: false,
    error: false,
    show: true,
}


export const trainTicket = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRAIN_TICKET_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_TRAIN_TICKET_SUCCESS:
            return {
                isLoading: false,
                data: action.payload.train,
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

export default trainTicket;


