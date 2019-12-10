import { findRenderedComponentWithType } from "react-dom/test-utils"

const initialState = {
    user: {}
}

const GET_USER = 'GET_USER' 
const LOGOUT = 'LOGOUT'

//action builder not default exported ▼

export function getUser(userObj){
    return { //action object
        type: GET_USER,
        payload: userObj
    }
}
export function logout(){
    return {
        type: LOGOUT,
        payload: null //you could leave payload out
    }
}


// reducer function ▼ -below- is always the default export 
export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_USER:
            return {...state, user: payload} //returns what state was?
        case LOGOUT: 
            return {...state, user: {}}
            //or return initialState - only would work cause we only have one property on initialstate. 
        default:
            return state;
    }
}
