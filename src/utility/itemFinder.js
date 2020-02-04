import worldMap from '../components/assets/map';
import { darkWorld } from './darkWorld';
import {
  move,
  fly,
  grabItem,
  examine,
  sellTreasure,
  checkStatus,
  recall,
} from '../actions';

// Random walker to find new items

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(value) {
    this.queue.push(value);
  }

  dequeue() {
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }
}

export const itemFinder = async (
  desiredStrength,
  desiredSpeed,
  dispatch,
  start_room_id,
  findTreasure = false,
  autoSell = true
) => {
  let room_id = start_room_id;
  console.log('Looking for boots with at least', desiredSpeed, 'speed');
  console.log('Looking for jacket with at least', desiredStrength, 'strength');
  if (findTreasure) console.log('Looking for treasure');
  if (autoSell) console.log('AutoSell is ON');
  if (findTreasure && !autoSell)
    console.log(
      'AutoSell is OFF. Will not automatically sell treasure if overencumbered.'
    );

  while (true) {
    let { strength, encumbrance, cooldown } = await checkStatus(dispatch);
    sleep(cooldown);

    if (autoSell && encumbrance >= strength) {
      console.log('Overencumbered!! Navigating to shop to sell treasure');
      await autoSellTreasure(room_id, dispatch);
      room_id = 1;
    }

    let map = room_id >= 500 ? darkWorld : worldMap;
    let rando = Math.floor(Math.random() * Object.keys(map).length);
    rando += room_id >= 500 ? 500 : 0;
    let destRoom = map[rando].room_id;
    console.log('Navigating from room', room_id, 'to', destRoom);
    await shortestPath(
      room_id,
      destRoom,
      dispatch,
      desiredStrength,
      desiredSpeed,
      true,
      findTreasure
    );

    room_id = destRoom;
  }
};

export const shortestPath = async (
  currRoom,
  destination,
  dispatch,
  desiredStrength,
  desiredSpeed,
  pickUpItems = true,
  findTreasure = false,
  isEncumbered = false
) => {
  let map = currRoom >= 500 ? darkWorld : worldMap;
  let path = getPath(currRoom, destination, map);
  let newRoom = null;
  let nextRoom = null;

  while (path.length) {
    nextRoom = path.shift();
    let terrain = map[nextRoom[1]].terrain;

    if (isEncumbered || terrain === 'CAVE') {
      newRoom = await move(dispatch, {
        direction: nextRoom[0],
        next_room_id: `${nextRoom[1]}`,
      });
    } else {
      newRoom = await fly(dispatch, {
        direction: nextRoom[0],
        next_room_id: `${nextRoom[1]}`,
      });
    }
    sleep(newRoom.cooldown);
    if (pickUpItems && newRoom.items.length) {
      console.log(newRoom.items);
      await grabItems(
        newRoom.items,
        desiredStrength,
        desiredSpeed,
        dispatch,
        findTreasure
      );
    }
  }
  return;
};

const getPath = (currRoom, destination, map) => {
  let queue = new Queue();
  let visited = new Set();
  queue.enqueue([['-', currRoom]]);
  while (queue.size() > 0) {
    let path = queue.dequeue();
    let lastRoom = path[path.length - 1][1];
    if (lastRoom === destination) {
      return path;
    }
    if (!visited.has(lastRoom)) {
      visited.add(lastRoom);
      let neighbors = getNeighbors(lastRoom, map);
      for (let room of neighbors) {
        let newPath = [...path, room];
        queue.enqueue(newPath);
      }
    }
  }
};

const getNeighbors = (roomNumber, map) => {
  let roomData = map[roomNumber];
  let { n, s, e, w } = roomData;
  let options = { n, s, e, w };
  let neighbors = [];
  for (let opt in options) {
    if (options[opt] !== undefined && options[opt] !== null)
      neighbors.push([opt, options[opt]]);
  }
  return neighbors;
};

async function grabItems(
  items,
  desiredStrength,
  desiredSpeed,
  dispatch,
  findTreasure = false
) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (findTreasure && item.includes('treasure')) {
      console.log('Grabbing', item);
      let itemGrab = await grabItem(dispatch, { name: item });
      sleep(itemGrab.cooldown);
    }
    if (!item.includes('treasure')) {
      let itemInfo = await examine(dispatch, { name: item });
      sleep(itemInfo.cooldown);
      if (itemInfo.attributes) {
        if (item.includes('jacket')) {
          let { STRENGTH } = JSON.parse(itemInfo.attributes);
          if (STRENGTH >= desiredStrength) {
            console.log('Grabbing', item, 'with strength', STRENGTH);
            let itemGrab = await grabItem(dispatch, { name: item });
            sleep(itemGrab.cooldown);
          }
        } else if (item.includes('boots')) {
          let { SPEED } = JSON.parse(itemInfo.attributes);
          if (SPEED >= desiredSpeed) {
            console.log('Grabbing', item, 'with speed', SPEED);
            let itemGrab = await grabItem(dispatch, { name: item });
            sleep(itemGrab.cooldown);
          }
        } else {
          console.log('Grabbing', item);
          let itemGrab = await grabItem(dispatch, { name: item });
          sleep(itemGrab.cooldown);
        }
      } else {
        console.log('Grabbing', item);
        let itemGrab = await grabItem(dispatch, { name: item });
        sleep(itemGrab.cooldown);
      }
    }
  }

  return;
}

async function autoSellTreasure(currRoom, dispatch) {
  let status = await checkStatus(dispatch);
  sleep(status.cooldown);
  let inventory = status.inventory;

  if (status.abilities.includes('recall')) {
    let { cooldown } = await recall(dispatch);
    sleep(cooldown);
    currRoom = 0;
  }
  await shortestPath(currRoom, 1, dispatch, 0, 0, false, false, true);

  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    if (item.includes('treasure')) {
      let sell = await sellTreasure(dispatch);
      console.log(sell.messages);
      sleep(sell.cooldown);
    }
  }
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
