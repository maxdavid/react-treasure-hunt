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
    .get('adv/wear/', data)
    .then(res => {
      dispatch({ type: EQUIPMENT_WORN });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EQUIPMENT_ERROR, payload: err.response.message });
    });
};

export const START_EQUIPMENT_REMOVAL = 'START_EQUIPMENT_REMOVAL';
export const EQUIPMENT_REMOVED = 'EQUIPMENT_REMOVED';
export const EQUIPMENT_ERROR = 'EQUIPMENT_ERROR';

/* 
    data needs to have a name
    {
        "name": "[NAME OF WEARABLE]"
    }
*/

export const wearEquipment = (dispatch, data) => {
  dispatch({ type: START_EQUIPMENT_REMOVAL });
  axiosWithAuth()
    .get('adv/undress/', data)
    .then(res => {
      dispatch({ type: EQUIPMENT_REMOVED });
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: EQUIPMENT_ERROR, payload: err.response.message });
    });
};