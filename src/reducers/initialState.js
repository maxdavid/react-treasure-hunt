export const initialState = {
  gameplay: {
    room_id: 0,
    name: 'PLAYER NAME',
    player_name: 'PLAYER NAME',
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
    abilities: [],
    gold: 0,
    elevation: 0,
    terrain: 'NORMAL',
    bodywear: null,
    footwear: null,
    inventory: [],
    items: [],
    status: [],
    isLoading: false,
    errorMessage: '',
    dimension: 'light',
    coins: 0,
    snitches: 0,
    cooldownLock: false,
    currentAction: 'idle' // idle / navigating / mining / snitching
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
