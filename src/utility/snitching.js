import { sleep } from './randomWalk';
import { grabItem, examine, warp } from '../actions';
import { shortestPath } from './shortestPath';
import { CPU } from './cpu';

export const snitching = async (currRoom, dispatch) => {
  let count = 0;

  while (true) {
    await shortestPath(currRoom, 55, dispatch);
    let warpRes = await warp(dispatch); // to dark world
    sleep(warpRes.cooldown);
    let { description, cooldown } = await examine(dispatch, { name: 'well' });
    sleep(cooldown);
    currRoom = ls8(description) - 500;
    warpRes = await warp(dispatch); // to light world
    sleep(warpRes.cooldown);
    await shortestPath(55, currRoom, dispatch);
    warpRes = await warp(dispatch); // to dark world
    sleep(warpRes.cooldown);

    let snitchGrab = await grabItem(dispatch, { name: 'golden snitch' });
    ++count;
    console.log(`${count} golden snitches found`);
    sleep(snitchGrab.cooldown);

    warpRes = await warp(dispatch); // to light world
    sleep(warpRes.cooldown);
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
