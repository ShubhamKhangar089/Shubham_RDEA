import { CANCEL_REGISTRATION_SUCCESS, GET_EVENT_FAILURE, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, REGISTER_SUCCESS } from "../actionTypes/eventActionTypes";

// eventsReducer.js
const initialState = {
    events: [],
    loading: false,
    error: null,
    isRegister :false
  };
  
  export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EVENT_REQUEST:
        return { ...state, loading: true };
      case GET_EVENT_SUCCESS:
        return { ...state, events: action.payload.event, loading: false };
      case GET_EVENT_FAILURE:
        return { ...state, error: action.error, loading: false };
        
      case REGISTER_SUCCESS :
        return { ...state, isRegister : true}

     case CANCEL_REGISTRATION_SUCCESS :
     return { ...state, isRegister :false}   

      default:
        return state;
    }
  };
// const initialState = {
//     event: [],
//     loading: false,
//     error: null,
//     isRegister :false
//   };
  
//  export const eventReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_EVENT_REQUEST:  
//         return { ...state, loading: true };
      
//         case GET_EVENT_SUCCESS:
//         return { ...state, loading: false, event: [action.payload] };

//         case GET_EVENT_FAILURE:
//           return { ...state, loading: false, error: action.payload.message };

//         // case REGISTER_REQUEST:
//         // return { ...state, loading: true };

//         // case REGISTER_SUCCESS: 
//         // return { ...state, loading: false, users: [action.payload]};        

//         // case REGISTER_FAILURE:
//         // return { ...state, loading: false, error: action.payload };

//         default:
//         return state;
//     }
//   };
  
