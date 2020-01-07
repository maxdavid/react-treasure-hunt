import {
  START_ITEM_GRAB,
  ITEM_GRABBED,
  ITEM_GRAB_ERROR,
  START_ITEM_DROP,
  ITEM_DROPPED,
  ITEM_DROP_ERROR,
  START_TREASURE_SELL,
  TREASURE_SOLD,
  TREASURE_SELL_ERROR,
  START_PRAYER,
  PRAYER_SUCCESS,
  PRAYER_ERROR,
  START_GIVE_ITEM,
  GIVE_ITEM_SUCCESS,
  GIVE_ITEM_ERROR,
  START_TAKE_ITEM,
  TAKE_ITEM_SUCCESS,
  TAKE_ITEM_ERROR,
  START_TRANSMOGRIFY,
  TRANSMOGRIFY_SUCCESS,
  TRANSMOGRIFY_ERROR,
  START_EQUIPMENT_WEAR,
  EQUIPMENT_WORN,
  EQUIPMENT_ERROR,
  START_EQUIPMENT_REMOVAL,
  EQUIPMENT_REMOVED,
  START_INIT,
  INIT_SUCCESS,
  INIT_ERROR,
  START_STATUS_CHECK,
  STATUS_SUCCESS,
  STATUS_ERROR,
  START_EXAMINE,
  EXAMINE_SUCCESS,
  EXAMINE_ERROR,
  START_NAME_CHANGE,
  NAMED_CHANGED,
  NAME_CHANGE_ERROR,
  START_GET_BALANCE,
  GOT_BALANCE,
  BALANCE_ERROR,
  START_MOVE,
  MOVE_SUCCESS,
  MOVE_ERROR,
  START_FLIGHT,
  FLYING_SUCCESS,
  FLYING_ERROR,
  START_DASH,
  DASH_SUCCESS,
  DASH_ERROR,
  START_WARP,
  WARP_SUCCESS,
  WARP_ERROR
} from '../actions';

/* 
gameplay: {
    room_id: 0,
    title: 'A Dark Room',
    description: 'You cannot see anything.',
    coordinates: '(60, 60)',
    exits: ['n', 's', 'e', 'w'],
    cooldown: 1.0,
    errors: [],
    messages: [],
    encumbrance: 2, //How much are you carrying?
    strength: 10, //How much can you carry?
    speed: 10, //How fast do you travel?
    gold: 0,
    bodywear: 'None',
    footwear: 'None',
    inventory: [],
    status: [],
    isLoading: false,
    errorMessage: ''
  },
*/

export const gameplayReducer = (state, { type, payload }) => {
  switch (type) {
    case START_NAME_CHANGE:
    case START_GET_BALANCE:
    case START_GIVE_ITEM:
    case START_INIT:
    case START_ITEM_DROP:
    case START_ITEM_GRAB:
    case START_MOVE:
    case START_WARP:
    case START_DASH:
    case START_FLIGHT:
    case START_EXAMINE:
    case START_STATUS_CHECK:
    case START_TREASURE_SELL:
    case START_PRAYER:
    case START_TAKE_ITEM:
    case START_TRANSMOGRIFY:
    case START_EQUIPMENT_REMOVAL:
    case START_EQUIPMENT_WEAR:
      return {
        ...state,
        isLoading: true
      };
    case ITEM_GRABBED:
    case ITEM_DROPPED:
    case TREASURE_SOLD:
    case PRAYER_SUCCESS:
    case GIVE_ITEM_SUCCESS:
    case TAKE_ITEM_SUCCESS:
    case TRANSMOGRIFY_SUCCESS:
    case EQUIPMENT_WORN:
    case EQUIPMENT_REMOVED:
    case INIT_SUCCESS:
    case STATUS_SUCCESS:
    case EXAMINE_SUCCESS:
    case NAMED_CHANGED:
    case GOT_BALANCE:
    case MOVE_SUCCESS:
    case FLYING_SUCCESS:
    case DASH_SUCCESS:
    case WARP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...payload
      };
    case ITEM_GRAB_ERROR:
    case ITEM_DROP_ERROR:
    case TREASURE_SELL_ERROR:
    case PRAYER_ERROR:
    case GIVE_ITEM_ERROR:
    case TAKE_ITEM_ERROR:
    case TRANSMOGRIFY_ERROR:
    case EQUIPMENT_ERROR:
    case INIT_ERROR:
    case STATUS_ERROR:
    case EXAMINE_ERROR:
    case NAME_CHANGE_ERROR:
    case BALANCE_ERROR:
    case MOVE_ERROR:
    case FLYING_ERROR:
    case DASH_ERROR:
    case WARP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload
      };
  }
};
