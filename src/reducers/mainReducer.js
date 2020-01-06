import { gameplayReducer } from './gameplay';
import { miningReducer } from './mining';

export const mainReducer = ({ gameplay, mining }, action) => ({
  gameplay: gameplayReducer(gameplay, action),
  mining: miningReducer(mining, action),
});
