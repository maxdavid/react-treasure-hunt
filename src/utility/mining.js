import { sha256 } from 'js-sha256';
import { sleep } from './randomWalk';
import { getProof, mine, examine } from '../actions';
import { shortestPath } from './shortestPath';

export const mining = async (currRoom, dispatch) => {
  let count = 0;
  while (true) {
    // await shortestPath(currRoom, 55);
    // let { description, cooldown } = await examine(dispatch, { name: 'well' });
    // sleep(cooldown)
    // await shortestPath(55, ls8(description));
    let lastProof = await getProof(dispatch);
    let { difficulty, proof } = lastProof;
    let newProof = await proofOfWork(proof, difficulty);
    let miningResult = await mine(dispatch, { proof: newProof });
    ++count;
    console.log(`${count} Lambda coin mined`);
    sleep(miningResult.cooldown);
  }
};

const proofOfWork = (lastProof, difficulty) => {
  let guess =
    Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER) +
    Number.MIN_SAFE_INTEGER;
  while (!validProof(lastProof, guess, difficulty)) {
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
    let code = description.match(/(?<=\\n\\n).*/)
    let inputs = code.split('\n')
};
