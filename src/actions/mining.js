import { axiosWithAuth } from '../utility/axiosTypes';

export const START_MINING = 'START_MINING';
export const MINE_SUCCESS = 'MINE_SUCCESS';
export const MINE_ERROR = 'MINE_ERROR';

/* 
    data needs to have a name
    {
        "proof": "new_proof"
    }
*/

export const mine = (dispatch, data) => {
  dispatch({ type: START_MINING });
  return axiosWithAuth()
    .post('bc/mine/', data)
    .then(res => {
      dispatch({ type: MINE_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: MINE_ERROR, payload: err.response.message });
      return err.response.data
    });
};

export const START_GETTING_PROOF = 'START_GETTING_PROOF';
export const GOT_PROOF = 'GOT_PROOF';
export const PROOF_ERROR = 'PROOF_ERROR';

export const getProof = dispatch => {
  dispatch({ type: START_GETTING_PROOF });
  return axiosWithAuth()
    .get('bc/last_proof/')
    .then(res => {
      dispatch({ type: GOT_PROOF, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log('error', err.response);
      dispatch({ type: PROOF_ERROR, payload: err.response.message });
    });
};
