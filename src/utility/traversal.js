import { move, fly, initGame } from '../actions';

let oppDirs = { n: 's', s: 'n', w: 'e', e: 'w' };

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

export const makeGraph = async dispatch => {
  let graph = {};
  let room = await initGame(dispatch);
  sleep(room.cooldown);
  while (Object.keys(graph).length < 500) {
    if(Object.keys(graph).length % 10 === 0){
        console.log(Object.keys(graph).length)
        console.log(JSON.stringify(graph))
    }
    if (!(room.room_id in graph)) storeRoom(room, graph);
    let options = findOptions(room, graph);
    if (options.length > 0)
      room = await traverse(options, room, graph, dispatch);
    else {
      let bfsResult = bfs(graph[room.room_id], graph);
      room = await getBack(bfsResult, graph, dispatch);
    }
  }
  console.log(graph);
  console.log(JSON.stringify(graph))
};

const traverse = async (options, room, graph, dispatch) => {
  let randIndex = Math.floor(Math.random() * (options.length - 1));
  let dir = options[randIndex];
  let newRoom = await move(dispatch, { direction: dir });
  sleep(newRoom.cooldown);
  graph[room.room_id][dir] = newRoom.room_id;
  storeRoom(newRoom, graph);
  graph[newRoom.room_id][oppDirs[dir]] = room.room_id;
  return newRoom;
};

const findOptions = (room, graph) => {
  let options = [];
  let dirs = ['n', 's', 'e', 'w'];
  for (let dir of dirs) {
    if (graph[room.room_id][dir] === '?') options.push(dir);
  }
  return options;
};

const storeRoom = (room, graph) => {
  if (!(room.room_id in graph)) {
    graph[room.room_id] = { ...room };
    for (let dir of room.exits) {
      graph[room.room_id][dir] = '?';
    }
  }
};

const bfs = (startRoom, graph) => {
  let bfsVisited = new Set();
  let queue = new Queue();
  queue.enqueue([startRoom]);
  while (queue.size() > 0) {
    let path = queue.dequeue();
    let room = path[path.length - 1];
    if (findOptions(room, graph).length > 0) return path;
    if (!bfsVisited.has(room.room_id)) {
      bfsVisited.add(room.room_id);
      let neighbors = getNeighbors(room.room_id, graph);
      for (let neighbor of neighbors) {
        let newPath = [...path, neighbor];
        queue.enqueue(newPath);
      }
    }
  }
};

const getNeighbors = (roomNumber, graph) => {
  let roomData = graph[roomNumber];
  let dirs = ['n', 's', 'e', 'w'];
  let neighbors = [];
  for (let dir of dirs) {
    if (dir in roomData) {
      let neighbor = roomData[dir];
      let neighborRoom = graph[neighbor];
      neighbors.push(neighborRoom);
    }
  }
  return neighbors;
};

const getBack = async (path, graph, dispatch) => {
  let newRoom = null;
  let startingRoom = path.shift();
  let nextRoom = null;
  let direction = null;
  while (path.length > 0) {
    nextRoom = path.shift();
    let dirs = ['n', 's', 'e', 'w'];
    for (let dir of dirs) {
      if (startingRoom[dir] === nextRoom.room_id) direction = dir;
    }
    let terrain = graph[nextRoom.room_id].terrain;

    if (terrain === 'CAVE') {
      newRoom = await move(dispatch, {
        direction: direction,
        next_room_id: `${nextRoom.room_id}`,
      });
    } else {
      newRoom = await fly(dispatch, {
        direction: direction,
        next_room_id: `${nextRoom.room_id}`,
      });
    }
    console.log(newRoom.messages, 'cooldown:', newRoom.cooldown);
    sleep(newRoom.cooldown);
    startingRoom = nextRoom;
  }

  return startingRoom;
};

function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}
