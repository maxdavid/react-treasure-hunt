import { axiosWithAuth } from './axiosTypes';
import { sha256 } from 'js-sha256';

export const mining = async () => {
  let lastProof = await axiosWithAuth().get('bc/last_proof/');
  let { difficulty, cooldown, proof } = lastProof.data;
  console.log(difficulty)
  let newProof = await proofOfWork(proof, difficulty);
  let miningResult = await axiosWithAuth().post('bc/mine/', {
    proof: newProof,
  });
  sleep(miningResult.data.cooldown);
};

const proofOfWork = (lastProof, difficulty) => {
  let guess =
    Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER) +
    Number.MIN_SAFE_INTEGER;
  let count = 0;
  while (!validProof(lastProof, guess, difficulty)) {
    ++count;
    if (count % 500000 === 0) {
      console.log('still going!', count);
    }
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

function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}