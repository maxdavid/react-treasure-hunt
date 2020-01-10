import { axiosWithAuth } from '../utility/axiosTypes';

export const START_ITEM_GRAB = 'START_ITEM_GRAB';
export const ITEM_GRABBED = 'ITEM_GRABBED';
export const ITEM_GRAB_ERROR = 'ITEM_GRAB_ERROR';

/* 
    data needs to have a name
    {
        "name": "treasure"
    }
*/

export const grabItem = (dispatch, data) => {
  dispatch({ type: START_ITEM_GRAB });
  return axiosWithAuth()
    .post('adv/take/', data)
    .then(res => {
      dispatch({ type: ITEM_GRABBED, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: ITEM_GRAB_ERROR, payload: err.response.message });
    });
};

export const START_ITEM_DROP = 'START_ITEM_DROP';
export const ITEM_DROPPED = 'ITEM_DROPPED';
export const ITEM_DROP_ERROR = 'ITEM_DROP_ERROR';

/* 
    data needs to have a name
    {
        "name": "treasure"
    }
*/

export const dropItem = (dispatch, data) => {
  dispatch({ type: START_ITEM_DROP });
  return axiosWithAuth()
    .post('adv/drop/', data)
    .then(res => {
      dispatch({ type: ITEM_DROPPED, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: ITEM_DROP_ERROR, payload: err.response.message });
    });
};

export const START_TREASURE_SELL = 'START_TREASURE_SELL';
export const TREASURE_SOLD = 'TREASURE_SOLD';
export const TREASURE_SELL_ERROR = 'TREASURE_SELL_ERROR';

export const sellTreasure = dispatch => {
  dispatch({ type: START_TREASURE_SELL });
  return axiosWithAuth()
    .post('adv/sell/', { name: 'treasure', confirm: 'yes' })
    .then(res => {
      dispatch({ type: TREASURE_SOLD, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: TREASURE_SELL_ERROR, payload: err.response.message });
    });
};

export const START_PRAYER = 'START_PRAYER';
export const PRAYER_SUCCESS = 'PRAYER_SUCCESS';
export const PRAYER_ERROR = 'PRAYER_ERROR';

export const pray = dispatch => {
  dispatch({ type: START_PRAYER });
  axiosWithAuth()
    .post('adv/pray/')
    .then(res => {
      dispatch({ type: PRAYER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: PRAYER_ERROR, payload: err.response.message });
    });
};

export const START_GIVE_ITEM = 'START_GIVE_ITEM';
export const GIVE_ITEM_SUCCESS = 'GIVE_ITEM_SUCCESS';
export const GIVE_ITEM_ERROR = 'GIVE_ITEM_ERROR';

/* 
    data needs to have a name
    {
        "name": "[ITEM_NAME]"
    }
*/

export const giveItemToGhost = (dispatch, data) => {
  dispatch({ type: START_GIVE_ITEM });
  axiosWithAuth()
    .post('adv/carry/', data)
    .then(res => {
      dispatch({ type: GIVE_ITEM_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: GIVE_ITEM_ERROR, payload: err.response.message });
    });
};

export const START_TAKE_ITEM = 'START_TAKE_ITEM';
export const TAKE_ITEM_SUCCESS = 'TAKE_ITEM_SUCCESS';
export const TAKE_ITEM_ERROR = 'TAKE_ITEM_ERROR';

/* 
    data needs to have a name
    {
        "name": "[ITEM_NAME]"
    }
*/

export const takeItemFromGhost = (dispatch, data) => {
  dispatch({ type: START_TAKE_ITEM });
  axiosWithAuth()
    .post('adv/receive/', data)
    .then(res => {
      dispatch({ type: TAKE_ITEM_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: TAKE_ITEM_ERROR, payload: err.response.message });
    });
};

export const START_TRANSMOGRIFY = 'START_TRANSMOGRIFY';
export const TRANSMOGRIFY_SUCCESS = 'TRANSMOGRIFY_SUCCESS';
export const TRANSMOGRIFY_ERROR = 'TRANSMOGRIFY_ERROR';

/* 
    data needs to have a name
    {
        "name": "[ITEM_NAME]"
    }
*/

export const transmogrify = (dispatch, data) => {
  dispatch({ type: START_TRANSMOGRIFY });
  return axiosWithAuth()
    .post('adv/transmogrify/', data)
    .then(res => {
      dispatch({ type: TRANSMOGRIFY_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: TRANSMOGRIFY_ERROR, payload: err.response.message });
    });
};
