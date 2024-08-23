import { GET_EVENT_FAILURE, GET_EVENT_REQUEST, GET_EVENT_SUCCESS } from "../actionTypes/eventActionTypes";
import axios from 'axios';

export const getAllEvent = () => async (dispatch) => {
    dispatch({ type: GET_EVENT_REQUEST });
    try {
      const response = await axios.get('http://localhost:8080/event/get');
      dispatch({ type: GET_EVENT_SUCCESS, payload: response.data }); 
    } catch (error) {
      dispatch({ type: GET_EVENT_FAILURE, payload: error.message });
    }
  };