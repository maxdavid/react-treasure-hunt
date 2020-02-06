import { shortestPath } from './shortestPath';
import { checkStatus, examine, transmogrify } from '../actions';
import { sleep } from './itemFinder';

export const transmogrifyRoller = async (
  currRoom,
  desiredStrength,
  desiredSpeed,
  dispatch
) => {
  await shortestPath(currRoom, 495, dispatch);
  let { cooldown, inventory } = await checkStatus(dispatch);
  console.log('Transmogrifying current items:', inventory);
  sleep(cooldown);

  while (true) {
    let stat = await checkStatus(dispatch);
    console.log('Current inventory:', stat.inventory);
    sleep(stat.cooldown);
    inventory = stat.inventory;

    let item = inventory[0];
    let trans = await transmogrify(dispatch, { name: item });
    let message = trans.messages[0];
    console.log(message);
    sleep(trans.cooldown);
    let itemName = message.match(/Your .* transmogrified into (.*)!/)[1];
    console.log(itemName);
    let exam = await examine(dispatch, { name: itemName });
    let { STRENGTH, SPEED } = JSON.parse(exam.attributes);
    console.log('SPEED:', SPEED, ', STRENGTH:', STRENGTH);
    sleep(exam.cooldown);

    if (
      message.includes('exquisite') ||
      message.includes('appalling') ||
      SPEED > desiredSpeed ||
      STRENGTH > desiredStrength
    ) {
      console.log(`Keeping ${itemName}, transmogrifying next item`);
      break;
    }
  }
};
