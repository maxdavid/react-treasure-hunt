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
  axiosWithAuth()
    .post('adv/take/', data)
    .then(res => {
      dispatch({ type: ITEM_GRABBED });
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
  axiosWithAuth()
    .post('adv/drop/', data)
    .then(res => {
      dispatch({ type: ITEM_DROPPED });
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
  dispatch({ type: START_TREASURE_SELL});
  axiosWithAuth()
    .post('adv/sell/', { name: 'treasure', confirm: 'yes' })
    .then(res => {
      dispatch({ type: TREASURE_SOLD });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: TREASURE_SELL_ERROR, payload: err.response.message });
    });
};
