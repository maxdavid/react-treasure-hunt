import { axiosWithAuth } from '../utility/axiosTypes';

export const START_EQUIPMENT_WEAR = 'START_EQUIPMENT_WEAR';
export const EQUIPMENT_WORN = 'EQUIPMENT_WORN';
export const EQUIPMENT_ERROR = 'EQUIPMENT_ERROR';

/* 
    data needs to have a name
    {
        "name": "[NAME OF WEARABLE]"
    }
*/

export const wearEquipment = (dispatch, data) => {
  dispatch({ type: START_EQUIPMENT_WEAR });
  axiosWithAuth()
    .post('adv/wear/', data)
    .then(res => {
      dispatch({ type: EQUIPMENT_WORN, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EQUIPMENT_ERROR, payload: err.response.message });
    });
};

export const START_EQUIPMENT_REMOVAL = 'START_EQUIPMENT_REMOVAL';
export const EQUIPMENT_REMOVED = 'EQUIPMENT_REMOVED';

/* 
    data needs to have a name
    {
        "name": "[NAME OF WEARABLE]"
    }
*/

export const removeEquipment = (dispatch, data) => {
  dispatch({ type: START_EQUIPMENT_REMOVAL });
  axiosWithAuth()
    .post('adv/undress/', data)
    .then(res => {
      dispatch({ type: EQUIPMENT_REMOVED, payload: res.data });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EQUIPMENT_ERROR, payload: err.response.message });
    });
};
