import { sleep } from './randomWalk';
import { initGame, checkStatus, getBalance, setCooldownLock } from '../actions';

export const getPlayerInfo = async dispatch => {
  setCooldownLock(true, dispatch);
  await initGame(dispatch);
  sleep(1);
  await checkStatus(dispatch);
  sleep(1);
  await getBalance(dispatch);
  sleep(1);
  setCooldownLock(false, dispatch);
};
