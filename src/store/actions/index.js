import axios from 'axios';
import { createBrowserHistory} from 'history';
import * as actionTypes from './actionTypes';
import setAuthToken from '../../API/'
import {API} from '../constant'
const { ERROR_MESSAGE} = API

const history = createBrowserHistory();


export const postUserStart = () => {
    return {
        type: actionTypes.POST_USER_START
    }
}

export const postUserSuccess = (payload) => {
    return {
        type: actionTypes.POST_USER_SUCCESS,
        payload
    }
}

export const postUserFail = (payload) => {
    return {
        type: actionTypes.POST_USER_FAIL,
        payload
    };
};

export const postUserRefresh = () => {
    return {
        type: actionTypes.POST_USER_REFRESH,
    };
};


export const createUser = (authId, gender, address, userImage, phoneNumber, role) => {
    return  (dispatch)  => {
      
        dispatch(postUserStart())
        axios.post('http://localhost:8000/profile', {authId, gender, address, userImage, phoneNumber, role })
            .then((response) => {
                console.log(response)
            dispatch(postUserSuccess(response))
        }).catch((error)=>postUserFail(error.data))
    }
}


////  AUTHENTICATION ACTIONS


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    }
}

export const authFail = (payload) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload
    };
};

export const authRefresh = () => {
    return {
        type: actionTypes.AUTH_REFRESH,
    };
};
export const logout = () => {
    return {
        type: actionTypes.LOG_OUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(userLogout());   
        },expirationTime * 1000)
    }
}



export const login = (username, password) => {
 
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://localhost:8000/auth/login/action',{username, password}).then(resp => {
            setTimeout(() => {
                dispatch(authSuccess(resp.data))
                dispatch(checkAuthTimeOut(resp.data.expiresIn))
                const token = resp.data.token;
                sessionStorage.setItem('user-token', token);
                setAuthToken(token)
            })
        }).catch(err => {
           
                dispatch(authFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE)) 
      })
    };
};

export const isSessionActive = () => {
  let token;
  try {
    token = sessionStorage.getItem("user-token");
  } catch (error) {
    return false;
  }
  return Boolean(token);
};

console.log(isSessionActive(),'session')

export const clearSession = () => {
  try {
    sessionStorage.removeItem("user-token");
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = () => (dispatch) => {
    dispatch(logout()); 
     clearSession();
};


export const amendAuthStart = () => {
    return {
        type: actionTypes.AMEND_AUTH_START
    }
}

export const amendAuthSuccess = (payload) => {
    return {
        type: actionTypes.AMEND_AUTH_SUCCESS,
        payload
    }
}

export const amendAuthFail = (payload) => {
    return {
        type: actionTypes.AMEND_AUTH_FAIL,
        payload
    };
};




export const amendAuth = (authId, name, email, password) => {
    return  (dispatch)  => {
      
        dispatch(amendAuthStart())
        axios.post('http://localhost:8000/auth/amend/'+ authId, {name, email, password })
            .then((response) => {
                console.log(response)
                dispatch(amendAuthSuccess(response.data))
                
               
        }).catch((error)=>amendAuthFail(error.data))
    }
}

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signUpSuccess = (payload) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        payload
    }
}

export const signUpFail = (payload) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        payload
    };
};

export const signUpRefresh = () => {
    return {
        type: actionTypes.SIGNUP_REFRESH,
    };
};


export const signUp = (name, email, password) => {
    return  (dispatch)  => {
      
        dispatch(signUpStart())
        axios.post('http://localhost:8000/passenger/', { name, email, password })
            .then((response) => {
            dispatch(signUpSuccess(response.data))
        }).catch((err)=> dispatch(signUpFail(err.response !== undefined ? err.response.data.error.msg : ERROR_MESSAGE.NETWORK_FAILURE))
)
    }
}

//TRAIN

//POST TRAIN ACTIONS 


export const postTrainStart = () => {
    return {
        type: actionTypes.POST_TRAIN_START
    }
}

export const postTrainSuccess = (payload) => {
    return {
        type: actionTypes.POST_TRAIN_SUCCESS,
        payload
    }
}

export const postTrainFail = (payload) => {
    return {
        type: actionTypes.POST_TRAIN_FAIL,
        payload
    };
};

export const postTrainRefresh = () => {
    return {
        type: actionTypes.POST_TRAIN_REFRESH
    };
};


export const createTrain = ({ trainName,
    source,
    destination,
    departure,
    arrival,
    quota,
    capacity,
    classes,
    adminId }) => {
    return (dispatch) => {
        //console.log(data, 'from post')
        dispatch(postTrainStart())
        axios.post('http://localhost:8000/trains', {
            trainName,
            source,
            destination,
            departure,
            arrival,
            quota,
            capacity,
            classes,
            adminId
        })
            .then((response) => {
                dispatch(postTrainSuccess(response.data))
                setTimeout(() => {
                    dispatch(getTrain())
                }, 2000)
            }).catch((err) => {
               dispatch(getTrain())
                dispatch(postTrainFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
                 
    
            })
        }
}


export const trainBookingStart = () => {
    return {
        type: actionTypes.TRAIN_BOOKING_START
    }
}

export const trainBookingSuccess = (payload) => {
    return {
        type: actionTypes.TRAIN_BOOKING_SUCCESS,
        payload
    }
}

export const trainBookingFail = (payload) => {
    return {
        type: actionTypes.TRAIN_BOOKING_FAIL,
        payload
    };
};

export const trainBookingRefresh = () => {
    return {
        type: actionTypes.TRAIN_BOOKING_REFRESH
    };
};


export const bookTrain = ({ trainNameNumber, fare,
    source,
    destination,
    departure,
    arrival,
    classes,
    passengerId }) => {
    return (dispatch) => {
        console.log(classes, 'from post')
        dispatch(trainBookingStart())
        axios.post('http://localhost:8000/payments', {
            trainNameNumber, fare,
    source,
    destination,
    departure,
    arrival,
    classes,
    passengerId
        })
            .then((response) => {
                dispatch(trainBookingSuccess(response.data))
            }).catch((err) => {
               dispatch(trainBookingFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
                 
    
            })
        }
}


export const destroyTrainBookingStart = () => {
    return {
        type: actionTypes.DESTROY_TRAIN_TICKET_START
    }
}

export const destroyTrainBookingSuccess = (payload) => {
    return {
        type: actionTypes.DESTROY_TRAIN_TICKET_SUCCESS,
        payload
    }
}

export const destroyTrainBookingFail = (payload) => {
    return {
        type: actionTypes.DESTROY_TRAIN_TICKET_FAIL,
        payload
    };
};

export const destroyTrainBookingRefresh = () => {
    return {
        type: actionTypes.DESTROY_TRAIN_TICKET_REFRESH
    };
};


export const destroyTicket = (id, passengerId) => {
    return (dispatch) => {
        dispatch(destroyTrainBookingStart())
        axios.post('http://localhost:8000/payments/destroy/'+ id)
            .then((response) => {
                dispatch(destroyTrainBookingSuccess(response.data))
                setTimeout(() => {
                    dispatch(getTrainTicket(passengerId))
                }, 1000);
            }).catch((err) => {
                setTimeout(() => {
                    dispatch(getTrainTicket(passengerId))
                }, 1000);
               dispatch(destroyTrainBookingFail(err.response !== undefined ? err.response.data.error.msg : ERROR_MESSAGE.NETWORK_FAILURE))
                 
    
            })
        }
}

//GET TRAIN

export const getTrainStart = () => {
    return {
        type: actionTypes.GET_TRAIN_START
    }
}

export const getTrainSuccess = (payload) => {
    return {
        type: actionTypes.GET_TRAIN_SUCCESS,
        payload
    }
}

export const getTrainFail = (payload) => {
    return {
        type: actionTypes.GET_TRAIN_FAIL,
        payload
    };
};


export const getTrain = () => {
    return  (dispatch)  => {
        dispatch(getTrainStart())
        axios.get('http://localhost:8000/trains')
            .then((response) => {
                setTimeout(() => {
                    dispatch(getTrainSuccess(response.data))  
                },)
                  
        }).catch((error)=>dispatch(getTrainFail(error.data)))
    }
}


export const getTrainTicketStart = () => {
    return {
        type: actionTypes.GET_TRAIN_TICKET_START
    }
}

export const getTrainTicketSuccess = (payload) => {
    return {
        type: actionTypes.GET_TRAIN_TICKET_SUCCESS,
        payload
    }
}

export const getTrainTicketFail = (payload) => {
    return {
        type: actionTypes.GET_TRAIN_TICKET_FAIL,
        payload
    };
};


export const getTrainTicket = (id) => {
    return  (dispatch)  => {
        dispatch(getTrainTicketStart())
        axios.get('http://localhost:8000/payments/'+ id)
            .then((response) => {
                  dispatch(getTrainTicketSuccess(response.data))  
        }).catch((err)=>dispatch(getTrainTicketFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
)
    }
}



//DESTROY TRAIN

export const destroyTrainStart = () => {
    return {
        type: actionTypes.DESTROY_TRAIN_START
    }
}

export const destroyTrainSuccess = (payload) => {
    return {
        type: actionTypes.DESTROY_TRAIN_SUCCESS,
        payload
    }
}

export const destroyTrainFail = (payload) => {
    return {
        type: actionTypes.DESTROY_TRAIN_FAIL,
        payload
    };
};
export const destroyTrainRefresh = () => {
    return {
        type: actionTypes.DESTROY_TRAIN_REFRESH,
    
    };
};


export const destroyTrain = (id) => {
    return  (dispatch)  => {
        dispatch(destroyTrainStart())
        axios.post('http://localhost:8000/trains/destroy/' + id)
            .then((response) => {
                dispatch(destroyTrainSuccess(response.data))
                setTimeout(() => {
                    dispatch(getTrain())
                }, 1000)
        }).catch((err)=>dispatch(destroyTrainFail(err.response !== undefined ? err.response.data.error.msg : ERROR_MESSAGE.NETWORK_FAILURE))
)
    }
}


//DESTROY TRAIN

export const amendTrainStart = () => {
    return {
        type: actionTypes.AMEND_TRAIN_START
    }
}

export const amendTrainSuccess = (payload) => {
    return {
        type: actionTypes.AMEND_TRAIN_SUCCESS,
        payload
    }
}

export const amendTrainFail = (payload) => {
    return {
        type: actionTypes.AMEND_TRAIN_FAIL,
        payload
    };
};

export const amendTrainRefresh = (payload) => {
    return {
        type: actionTypes.AMEND_TRAIN_REFRESH,
        payload
    };
};


export const amendTrain = ({
    id,
    trainName,
    trainNumber,
    source,
    destination,
    departure,
    arrival,
    quota,
    capacity,
    classes,
    adminId
}) => {
    return (dispatch) => {
        dispatch(amendTrainStart())
        axios.post('http://localhost:8000/trains/amend/' + id, {
            trainName,
            trainNumber,
            source,
            destination,
            departure,
            arrival,
            quota,
            capacity,
            classes,
            adminId
        })
            .then((response) => {
                dispatch(amendTrainSuccess(response.data))
                setTimeout(() => {
                    dispatch(getTrain())
                }, 1000)
            }).catch((err) => {
                setTimeout(() => {
                    dispatch(getTrain())
                }, 1000);
                dispatch(amendTrainFail(err.response !== undefined ? err.response.data.error.msg : ERROR_MESSAGE.NETWORK_FAILURE))
            })
}
}




//UPDATE PROFILE

export const amendProfileStart = () => {
    return {
        type: actionTypes.AMEND_PROFILE_START
    }
}

export const amendProfileSuccess = (payload) => {
    return {
        type: actionTypes.AMEND_PROFILE_SUCCESS,
        payload
    }
}

export const amendProfileFail = (payload) => {
    return {
        type: actionTypes.AMEND_PROFILE_FAIL,
        payload
    };
};
export const amendProfileRefresh = (payload) => {
    return {
        type: actionTypes.AMEND_PROFILE_REFRESH,
        payload
    };
};



export const amendProfile = (id,gender,contactAdd,phoneNumber) => {
    return  (dispatch)  => {
        dispatch(amendProfileStart())
        console.log(id, gender, contactAdd, phoneNumber, 'from actions');
        axios.post('http://localhost:8000/profile/amend/' + id, {
                gender,
                contactAdd,
                phoneNumber
        })
            .then((response) => {
                dispatch(amendProfileSuccess(response.data))
                
        }).catch((error)=>dispatch(amendProfileFail(error.data)))
    }
}



export const getProfileStart = () => {
    return {
        type: actionTypes.GET_PROFILE_START
    }
}

export const getProfileSuccess = (payload) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        payload
    }
}

export const getProfileFail = (payload) => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        payload
    };
};


export const getProfile = () => {
    return  (dispatch)  => {
        dispatch(getProfileStart())
        axios.get('http://localhost:8000/profile/').then((response) => {
                dispatch(getProfileSuccess(response.data))
        }).catch((error)=>dispatch(getProfileFail(error.data)))
    }
}
