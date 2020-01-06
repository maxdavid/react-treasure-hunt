import { axiosWithAuth } from '../utility/axiosTypes';

export const START_MOVE = 'START_MOVE';
export const MOVE_SUCCESS = 'MOVE_SUCCESS';
export const MOVE_ERROR = 'MOVE_ERROR';

/* 
    data needs to have a direction and can have a next_room_id
    {
        "direction": "n",
        "next_room_id": "0"
    }
*/

export const move = (dispatch, data) => {
  dispatch({ type: START_MOVE });
  axiosWithAuth()
    .post('adv/move/', data)
    .then(res => {
      dispatch({ type: MOVE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: MOVE_ERROR, payload: err.response.message });
    });
};
