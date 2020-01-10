import { sleep } from './randomWalk';
import { grabItem, examine } from '../actions';
import { shortestPath } from './shortestPath';
import { CPU } from './cpu';

export const snitching = async (currRoom, dispatch) => {
  let count = 0;

  while (true) {
    await shortestPath(currRoom, 555, dispatch, 'snitching');
    let { description, cooldown } = await examine(dispatch, { name: 'well' });
    sleep(cooldown);
    let destination = ls8(description);
    await shortestPath(555, destination, dispatch, 'snitching');
    let snitchGrab = await grabItem(dispatch, { name: 'golden snitch' });
    sleep(snitchGrab.cooldown);
    ++count;
    dispatch({type:"increment snitch count"})
    console.log(`${count} golden snitches found`);
    currRoom = destination
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
