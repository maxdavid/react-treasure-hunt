import worldMap from '../components/assets/map';
import { move, grabItem, checkStatus, sellTreasure } from '../actions';
import { shortestPath } from './shortestPath';

export const randomWalk = async (desiredTreasure, dispatch, start_room_id, start_exits) => {
  let room_id = start_room_id;
  let exits = start_exits;
  let treasureCount = 0;
  while (true) {
    let storedData = worldMap[`${room_id}`];
    let options = find_options(exits, storedData);
    let currentRoom = await traverse(options, dispatch);
    sleep(currentRoom.cooldown);
    room_id = currentRoom.room_id;
    exits = currentRoom.exits;
    if (currentRoom.items.length) {
      await grabTreasure(desiredTreasure, treasureCount, dispatch, room_id);
    }
    if (
      ['318', '409', '431', '487', '489', '492'].includes(currentRoom.room_id)
    ) {
      console.log('NEW ROOM FOUND!!!!!!!!!');
    }
  }
};

async function grabTreasure(desiredTreasure, treasureCount, dispatch, room_id) {
  ++treasureCount;
  let treasureGrab = await grabItem(dispatch, { name: 'treasure' });
  sleep(treasureGrab.cooldown);
  if (treasureCount >= desiredTreasure) {
    await shortestPath(room_id, 495, dispatch);
    // let status = await checkStatus(dispatch);
    // let inventory = status.inventory.length;
    // while (inventory) {
    //   let treasureSold = await sellTreasure(dispatch);
    //   sleep(treasureSold.cooldown);
    //   inventory--;
    // }
  }
  return
}

function find_options(exits, data) {
  let roomExits = exits.map(direction => {
    return [direction, data[direction]];
  });
  return roomExits;
}

async function traverse(options, dispatch) {
  let numOfOptions = options.length;
  let randIndex = Math.floor(Math.random() * numOfOptions);
  let chosenWay = options[randIndex];
  let newRoom = await move(dispatch, {
    direction: chosenWay[0],
    next_room_id: `${chosenWay[1]}`,
  });
  return newRoom;
}

export function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}
