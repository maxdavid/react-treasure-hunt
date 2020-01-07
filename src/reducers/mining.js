import {
  START_MINING,
  MINE_SUCCESS,
  MINE_ERROR,
  START_GETTING_PROOF,
  GOT_PROOF,
  PROOF_ERROR,
} from '../actions';

/* 
mining: {
    proof: '',
    difficulty: '',
    errors: [],
    messages: [],
    cooldown: '',
    isLoading: false,
    errorMessage: ''
  }
*/

export const miningReducer = (state, { type, payload }) => {
  switch (type) {
    case START_MINING:
    case START_GETTING_PROOF:
      return {
        ...state,
        isLoading: true,
      };
    case MINE_SUCCESS:
    case GOT_PROOF:
      return {
        ...state,
        isLoading: false,
      };
    case MINE_ERROR:
    case PROOF_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default:
        return {...state}
  }
};
