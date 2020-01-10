import { sleep } from './randomWalk';
import { grabItem, examineCheat } from '../actions';
import { shortestPath } from './shortestPath';
import { CPU } from './cpu';

export const snitchCheat = async (currRoom, dispatch) => {
  let count = 0;

  while (true) {
    let { description } = await examineCheat(dispatch, { name: 'well' });
    let destination = ls8(description);
    await shortestPath(currRoom, destination, dispatch, 'snitching');
    let snitchGrab = await grabItem(dispatch, { name: 'golden snitch' });
    sleep(snitchGrab.cooldown);
    if (snitchGrab.errors.length > 0) {
      console.log('Snitch was gone!');
    } else {
      ++count;
      dispatch({ type: 'increment snitch count' });
      console.log(`${count} snitches have been grabbed!`);
    }
    currRoom = destination;
  }
};

const ls8 = description => {
  let code = description.match(/\d+(?=\D)/g);
  let cpu = new CPU();
  cpu.load(code);
  cpu.run();
  let message = cpu.message;
  console.log(message);
  let room = message.match(/\d+/)[0];
  return +room;
};
