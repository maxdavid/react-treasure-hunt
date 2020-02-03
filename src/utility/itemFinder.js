import worldMap from '../components/assets/map';
import { darkWorld } from './darkWorld';
import { move, fly, grabItem, examine } from '../actions';

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
  start_room_id
) => {
  let room_id = start_room_id;
  console.log('Looking for boots with at least', desiredSpeed, 'speed');
  console.log('Looking for jacket with at least', desiredStrength, 'strength');
  while (true) {
    let map = room_id >= 500 ? darkWorld : worldMap;
    let rando = Math.floor(Math.random() * Object.keys(map).length);
    rando += room_id >= 500 ? 500 : 0;
    let destRoom = map[rando].room_id;
    console.log('Navigating from room', room_id, 'to', destRoom);
    let pathfinder = await shortestPath(
      room_id,
      destRoom,
      dispatch,
      desiredStrength,
      desiredSpeed
    );

    room_id = destRoom;
  }
};

export const shortestPath = async (
  currRoom,
  destination,
  dispatch,
  desiredStrength,
  desiredSpeed
) => {
  let map = currRoom >= 500 ? darkWorld : worldMap;
  let path = getPath(currRoom, destination, map);
  let newRoom = null;
  let nextRoom = null;

  while (path.length) {
    nextRoom = path.shift();
    let terrain = map[nextRoom[1]].terrain;

    if (terrain === 'CAVE') {
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
    if (newRoom.items.length) {
      console.log(newRoom.items);
      await grabItems(newRoom.items, desiredStrength, desiredSpeed, dispatch);
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

async function grabItems(items, desiredStrength, desiredSpeed, dispatch) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
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
  let itemGrab = await grabItem(dispatch, { name: 'treasure' });
  sleep(itemGrab.cooldown);
  return;
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
