import axios from 'axios';
import {FETCH__USER} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
      dispatch({type: FETCH__USER, payload: res.data});
};

export const handleToken =(token) => async dispatch => {
     const res = await axios.post('/api/stripe')
};

// export const fetchUser = () => {
//      // axios.get ('/api/current_user');
//      return function(dispatch){
//           axios.get ('/api/current_user')
//               .then(res => dispatch({ type : FETCH__USER, payload: res }));
//      }
// };