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
  return axiosWithAuth()
    .post('adv/move/', data)
    .then(res => {
      dispatch({ type: MOVE_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: MOVE_ERROR, payload: err.response.message });
    });
};

export const START_FLIGHT = 'START_FLIGHT';
export const FLYING_SUCCESS = 'FLYING_SUCCESS';
export const FLYING_ERROR = 'FLYING_ERROR';

/* 
    data needs to have a direction and can have a next_room_id
    {
        "direction": "n",
    }
*/

export const fly = (dispatch, data) => {
  dispatch({ type: START_FLIGHT });
  return axiosWithAuth()
    .post('adv/fly/', data)
    .then(res => {
      dispatch({ type: FLYING_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: FLYING_ERROR, payload: err.response.message });
    });
};

export const START_DASH = 'START_DASH';
export const DASH_SUCCESS = 'DASH_SUCCESS';
export const DASH_ERROR = 'DASH_ERROR';

/* 
    data needs to have a direction, num_rooms, and correctly formatted
    next room in a straight line with num rooms being the exact count
    {
        "direction": "n",
        "num_rooms": "5",
        "next_room_ids": "10, 19, 20, 63, 72"
    }
*/

export const dash = (dispatch, data) => {
  dispatch({ type: START_DASH });
  return axiosWithAuth()
    .post('adv/dash/', data)
    .then(res => {
      dispatch({ type: DASH_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: DASH_ERROR, payload: err.response.message });
    });
};

export const START_WARP = 'START_WARP';
export const WARP_SUCCESS = 'WARP_SUCCESS';
export const WARP_ERROR = 'WARP_ERROR';

export const warp = dispatch => {
  dispatch({ type: START_WARP });
  return axiosWithAuth()
    .post('adv/warp/')
    .then(res => {
      if (res.data.room_id >= 500) {
        console.log('warped to dark world...', 'cooldown:', res.data.cooldown);
        res.data.dimension = 'dark';
      } else {
        console.log('warped to light world...', 'cooldown:', res.data.cooldown);
        res.data.dimension = 'light';
      }
      dispatch({ type: WARP_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: WARP_ERROR, payload: err.response.message });
    });
};

export const START_RECALL = 'START_RECALL';
export const RECALL_SUCCESS = 'RECALL_SUCCESS';
export const RECALL_ERROR = 'RECALL_ERROR';

export const recall = dispatch => {
  dispatch({ type: START_RECALL });
  return axiosWithAuth()
    .post('adv/recall/')
    .then(res => {
      console.log(res.data.messages, 'cooldown:', res.data.cooldown);
      dispatch({ type: RECALL_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: RECALL_ERROR, payload: err.response.message });
    });
};
