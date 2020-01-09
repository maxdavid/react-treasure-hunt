import worldMap from '../components/assets/map';
import { darkWorld } from './darkWorld';
import { move, fly, dash } from '../actions';

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

export const shortestPath = async (
  currRoom,
  destination,
  dispatch,
  reason = 'mining'
) => {
  let map = reason === 'snitching' ? darkWorld : worldMap;
  let path = getPath(currRoom, destination, map);
  let newRoom = null;
  let startingRoom = path.shift();
  let nextRoom = null;

  while (path.length) {
    let [newPath, dashPath, dashDirection] = dashPossible(
      startingRoom,
      [...path],
      map
    );
    if (dashPath.length > 2) {
      newRoom = await dash(dispatch, {
        direction: dashDirection,
        num_rooms: `${dashPath.length}`,
        next_room_ids: `${dashPath}`,
      });
      path = newPath;
      nextRoom = ['-', dashPath[dashPath.length - 1]];
    } else {
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
    }
    console.log(newRoom.messages, 'cooldown:', newRoom.cooldown);
    sleep(newRoom.cooldown);
    startingRoom = nextRoom;
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

function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}

const dashPossible = (start, path, map) => {
  let newPath = [...path];
  let startingRoom = map[start[1]];
  let data = Object.entries(startingRoom);
  let initialDirection = data.filter(point => point[1] === newPath[0][1])[0][0];
  let dashPath = [];
  while (newPath.length) {
    let newRoom = newPath.shift();
    if ([242, 302, 339, 361, 415, 422, 426, 457].includes(newRoom[1])) {
      return [[], [], []];
    }
    dashPath.push(newRoom[1]);
    if (newPath.length && map[newRoom[1]][initialDirection] === newPath[0][1]) {
      continue;
    } else {
      break;
    }
  }

  return [newPath, dashPath, initialDirection];
};
