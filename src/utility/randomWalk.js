import worldMap from '../components/assets/map';
import { axiosWithAuth } from './axiosTypes';

export const randomWalk = async (room_id, exits) => {
  let rooms = 5000;
  while (rooms) {
    rooms--;
    let storedData = worldMap[`${room_id}`];
    let options = find_options(exits, storedData);
    let currentRoom = await traverse(options);
    sleep(currentRoom.data.cooldown);
    let { items, exits, room_id } = currentRoom.data;
    if (items.length) {
      let treasureGrab = await axiosWithAuth().post('adv/take/', {
        name: 'treasure',
      });
      sleep(treasureGrab.data.cooldown);
    }
    if (
      ['318', '409', '431', '487', '489', '492'].includes(
        currentRoom.data.room_id
      )
    ) {
      console.log('NEW ROOM FOUND!!!!!!!!!');
    }
  }
};

function find_options(exits, data) {
  let roomExits = exits.map(direction => {
    return [direction, data[direction]];
  });
  return roomExits;
}

async function traverse(options) {
  let numOfOptions = options.length;
  let randIndex = Math.floor(Math.random() * numOfOptions);
  let chosenWay = options[randIndex];
  let newRoom = await axiosWithAuth().post('adv/move', {
    direction: chosenWay[0],
    next_room_id: `${chosenWay[1]}`,
  });
  return newRoom;
}

function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}
