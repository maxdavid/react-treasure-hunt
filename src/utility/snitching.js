import { sleep } from './randomWalk';
import { grabItem, examine, setCurrentAction, warp, recall } from '../actions';
import { shortestPath } from './shortestPath';
import { CPU } from './cpu';

export const snitching = async (
  currRoom,
  dispatch,
  hasFly = true,
  hasDash = true,
  hasRecall = true
) => {
  setCurrentAction('snitching', dispatch);
  let count = 0;

  while (true) {
    // TODO: optimize, determine whether its faster to recall and warp or just nav
    if (hasRecall) {
      let recallAction = await recall(dispatch);
      sleep(recallAction.cooldown);
      await shortestPath(0, 55, dispatch, hasFly, hasDash);
      let warpAction = await warp(dispatch);
      sleep(warpAction.cooldown);
    } else {
      await shortestPath(currRoom, 555, dispatch, hasFly, hasDash);
    }

    let { description, cooldown } = await examine(dispatch, { name: 'well' });
    sleep(cooldown);
    let destination = ls8(description);
    await shortestPath(555, destination, dispatch, hasFly, hasDash);
    let snitchGrab = await grabItem(dispatch, { name: 'golden snitch' });
    sleep(snitchGrab.cooldown);
    ++count;
    dispatch({ type: 'increment snitch count' });
    console.log(`${count} golden snitches found`);
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
