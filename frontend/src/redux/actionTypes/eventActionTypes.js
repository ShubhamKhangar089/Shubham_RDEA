// get all event list
export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const CANCEL_REGISTRATION_SUCCESS = 'CANCEL_REGISTRATION_SUCCESS';



















// import axios from 'axios';

// get all user list
// export const GET_USER_REQUEST = 'GET_USER_REQUEST';
// export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
// export const GET_USER_FAILURE = 'GET_USER_FAILURE';

// export const getAllUsers = () => async (dispatch) => {
//     dispatch({ type: GET_USER_REQUEST });
//     try {
//       const response = await axios.get('http://localhost:8080/user/get');
//       dispatch({ type: GET_USER_SUCCESS, payload: response.data }); 
//     } catch (error) {
//       dispatch({ type: GET_USER_FAILURE, payload: error.message });
//     }
//   };


// // Register
// export const REGISTER_REQUEST = 'REGISTER_REQUEST';
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// export const RegisterUser =(formData)=> async(dispatch)=>{
//       dispatch({type : REGISTER_REQUEST});
//       try {
//         const response = await axios.post('http://localhost:8080/user/register', formData);
//         dispatch({ type: REGISTER_SUCCESS, payload: response.data }); 
//       } catch (error) {
//         dispatch({ type: REGISTER_FAILURE, payload: error.message });
//       }
// }


// // Login
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// export const LoginUser = (formData)=> async(dispatch)=>{
    
//     dispatch({type : LOGIN_REQUEST});
//     try {
//       const response = await axios.post('http://localhost:8080/user/login', formData);
//       console.log("response role:",response.data.role);
//       console.log("response token:",response.data.token);
//       console.log("response user:",response.data.username);
//       if(response.ok){
//       let role = response.data.role;
//       let token = response.data.token;
//       let user = response.data.user;

//         localStorage.setItem('user', JSON.stringify(role));
//         localStorage.setItem('token', JSON.stringify(token));
//         localStorage.setItem('role', JSON.stringify(user));
//       }
//       dispatch({ type: LOGIN_SUCCESS, payload: response.data }); 
//     } catch (error) {
//       dispatch({ type: LOGIN_FAILURE, payload: error.message });
//     }
// }