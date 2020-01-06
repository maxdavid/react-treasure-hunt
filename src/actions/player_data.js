import { axiosWithAuth } from '../utility/axiosTypes';

export const START_INIT = 'START_INIT';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const INIT_ERROR = 'INIT_ERROR';

export const initGame = dispatch => {
  dispatch({ type: START_INIT });
  axiosWithAuth()
    .get('adv/init/')
    .then(res => {
      dispatch({ type: INIT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: INIT_ERROR, payload: err.response.message });
    });
};

export const START_STATUS_CHECK = 'START_STATUS_CHECK';
export const STATUS_SUCCESS = 'STATUS_SUCCESS';
export const STATUS_ERROR = 'STATUS_ERROR';

export const checkStatus = dispatch => {
  dispatch({ type: START_STATUS_CHECK });
  axiosWithAuth()
    .post('adv/status/')
    .then(res => {
      dispatch({ type: STATUS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: STATUS_ERROR, payload: err.response.message });
    });
};

export const START_EXAMINE = 'START_EXAMINE';
export const EXAMINE_SUCCESS = 'EXAMINE_SUCCESS';
export const EXAMINE_ERROR = 'EXAMINE_ERROR';

/* 
    data needs to have a name
    {
        "name": "[NAME OF ITEM OR PLAYER]"
    }
*/

export const examine = (dispatch, data) => {
  dispatch({ type: START_EXAMINE });
  axiosWithAuth()
    .post('adv/examine/', data)
    .then(res => {
      dispatch({ type: EXAMINE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EXAMINE_ERROR, payload: err.response.message });
    });
};
