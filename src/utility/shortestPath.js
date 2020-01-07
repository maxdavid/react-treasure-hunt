import worldMap from '../components/assets/map';
import { move, fly } from '../actions';

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

export const shortestPath = async (currRoom, destination, dispatch) => {
  let path = getPath(currRoom, destination);
  path.shift();
  while (path.length) {
    let nextRoom = path.shift();
    let newRoom = await fly(dispatch, {
      direction: nextRoom[0],
      next_room_id: `${nextRoom[1]}`,
    });
    sleep(newRoom.cooldown);
  }
  return;
};

const getPath = (currRoom, destination) => {
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
      let neighbors = getNeighbors(lastRoom);
      for (let room of neighbors) {
        let newPath = [...path, room];
        queue.enqueue(newPath);
      }
    }
  }
};

const getNeighbors = roomNumber => {
  let roomData = worldMap[roomNumber];
  let { n, s, e, w } = roomData;
  let options = { n, s, e, w };
  let neighbors = [];
  for (let opt in options) {
    if (options[opt] !== null) neighbors.push([opt, options[opt]]);
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
