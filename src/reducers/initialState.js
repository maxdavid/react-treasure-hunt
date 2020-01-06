export const initialState = {
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
  mining: {
    proof: '',
    difficulty: '',
    errors: [],
    messages: [],
    cooldown: '',
    isLoading: false,
    errorMessage: ''
  }
};
