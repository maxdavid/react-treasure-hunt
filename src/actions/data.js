import { axiosWithAuth } from '../utility/axiosTypes';

export const START_INIT = 'START_INIT';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const INIT_ERROR = 'INIT_ERROR';

export const initGame = dispatch => {
  dispatch({ type: START_INIT });
  return axiosWithAuth()
    .get('adv/init/')
    .then(res => {
      res.data.dimension = res.data.room_id >= 500 ? 'dark' : 'light';
      dispatch({ type: INIT_SUCCESS, payload: res.data });
      return res.data;
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
  return axiosWithAuth()
    .post('adv/status/')
    .then(res => {
      res.data.player_name = res.data.name;
      dispatch({ type: STATUS_SUCCESS, payload: res.data });
      return res.data;
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
  return axiosWithAuth()
    .post('adv/examine/', data)
    .then(res => {
      dispatch({ type: EXAMINE_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EXAMINE_ERROR, payload: err.response.message });
    });
};

export const START_NAME_CHANGE = 'START_NAME_CHANGE';
export const NAMED_CHANGED = 'NAMED_CHANGED';
export const NAME_CHANGE_ERROR = 'NAME_CHANGE_ERROR';

/* 
    data needs to have a name
    {
        "name": "[NEW NAME]"
    }
*/

export const changeName = (dispatch, data) => {
  dispatch({ type: START_NAME_CHANGE });
  axiosWithAuth()
    .post('adv/change_name/', data)
    .then(res => {
      console.log(res);
      dispatch({ type: NAMED_CHANGED });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: NAME_CHANGE_ERROR, payload: err.response.message });
    });
};

export const START_GET_BALANCE = 'START_GET_BALANCE';
export const GOT_BALANCE = 'GOT_BALANCE';
export const BALANCE_ERROR = 'BALANCE_ERROR';

export const getBalance = dispatch => {
  dispatch({ type: START_GET_BALANCE });
  return axiosWithAuth()
    .get('bc/get_balance/')
    .then(res => {
      res.data.coins = res.data.messages[0].match(/(\d+)\./)[1];
      dispatch({ type: GOT_BALANCE, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: BALANCE_ERROR, payload: err.response.message });
    });
};

export const SET_COOLDOWN_LOCK = 'SET_COOLDOWN_LOCK';

export const setCooldownLock = (lock, dispatch) => {
  dispatch({ type: SET_COOLDOWN_LOCK, payload: { cooldownLock: lock } });
};

export const SET_CURRENT_ACTION = 'SET_CURRENT_ACTION';

export const setCurrentAction = (action, dispatch) => {
  dispatch({ type: SET_CURRENT_ACTION, payload: { currentAction: action } });
};
