import { sha256 } from 'js-sha256';
import { sleep } from './randomWalk';
import { getProof, mine, examine, setCurrentAction, recall } from '../actions';
import { shortestPath } from './shortestPath';
import { CPU } from './cpu';

export const mining = async (
  currRoom,
  dispatch,
  hasFly = true,
  hasDash = true,
  hasRecall = true,
  isEncumbered = false
) => {
  setCurrentAction('mining', dispatch);
  let count = 0;

  while (true) {
    if (hasRecall) {
      let recallAction = await recall(dispatch);
      sleep(recallAction.cooldown);
      await shortestPath(0, 55, dispatch, hasFly, hasDash, isEncumbered);
    } else
      await shortestPath(currRoom, 55, dispatch, hasFly, hasDash, isEncumbered);

    let { description, cooldown } = await examine(dispatch, { name: 'well' });
    sleep(cooldown);

    currRoom = ls8(description);
    await shortestPath(55, currRoom, dispatch, hasFly, hasDash, isEncumbered);

    while (true) {
      let lastProof = await getProof(dispatch);
      let { difficulty, proof } = lastProof;
      let newProof = await proofOfWork(proof, difficulty);
      if (newProof === 'restart') continue;
      let miningResult = await mine(dispatch, { proof: newProof });
      if (miningResult.errors.length > 0) {
        console.log(miningResult.errors);
        sleep(miningResult.cooldown);
      } else {
        ++count;
        dispatch({ type: 'increment coin count' });
        console.log(`${count} Lambda coin mined`);
        sleep(miningResult.cooldown);
        break;
      }
    }
  }
};

const proofOfWork = (lastProof, difficulty) => {
  let guess =
    Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER) +
    Number.MIN_SAFE_INTEGER;
  let count = 0;
  while (!validProof(lastProof, guess, difficulty)) {
    count++;
    if (count % 1000000 === 0) console.log(`${count}`);
    if (count > 10000000) return 'restart';
    guess =
      Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER) +
      Number.MIN_SAFE_INTEGER;
  }
  return guess;
};

const validProof = (lastProof, guess, difficulty) => {
  let guess_hash = sha256(`${lastProof}${guess}`);
  let guess_target = guess_hash.slice(0, difficulty);
  let target = '0'.repeat(difficulty);
  return guess_target === target;
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
