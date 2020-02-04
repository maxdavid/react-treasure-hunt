import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import { sleep } from '../utility/randomWalk';
import { warp, setCooldownLock, setCurrentAction } from '../actions';
import { mining, snitching, itemFinder, darkWorld } from '../utility';

export const ActionButtons = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [destinationRoom, setDestinationRoom] = useState('');
  const [desiredTreasure, setDesiredTreasure] = useState('');
  const hasFly = gameplay.abilities.includes('fly');
  const hasDash = gameplay.abilities.includes('dash');
  const hasRecall = gameplay.abilities.includes('recall');

  const warpCooldown = async dispatch => {
    setCooldownLock(true, dispatch);
    setCurrentAction('warping', dispatch);
    const { cooldown } = await warp(dispatch);
    sleep(cooldown);
    setCooldownLock(false, dispatch);
    setCurrentAction('idle', dispatch);
  };

  return (
    <StyledActionButtons>
      {/* <button onClick={() => makeGraph(dispatch)}>Make Graph</button>
      <input
        value={desiredTreasure}
        onChange={e => setDesiredTreasure(e.target.value)}
      />
      <button
        onClick={() =>
          randomWalk(
            desiredTreasure,
            dispatch,
            gameplay.room_id,
            gameplay.exits
          )
        }
      >
        Find Treasure
      </button>
      <input
        value={destinationRoom}
        onChange={e => setDestinationRoom(e.target.value)}
      />
      <button
        onClick={() =>
          shortestPath(gameplay.room_id, +destinationRoom, dispatch, reason)
        }
      >
        Go to chosen room
      </button> */}
      {/* <button
        disabled={!gameplay.abilities.includes('warp')}
        onClick={() => warpCooldown(dispatch)}
      >
        Warp
      </button> */}
      <button
        onClick={() =>
          itemFinder(
            gameplay.strength - 11,
            gameplay.speed - 9,
            dispatch,
            gameplay.room_id
          )
        }
      >
        Item Finder
      </button>
      <button
        onClick={() =>
          mining(gameplay.room_id, dispatch, hasFly, hasDash, hasRecall)
        }
        disabled={gameplay.name.match(/^User \d/)}
      >
        Mine Lambda Coins
      </button>
      <button
        disabled={!gameplay.abilities.includes('warp')}
        onClick={() =>
          snitching(gameplay.room_id, dispatch, hasFly, hasDash, hasRecall)
        }
      >
        Find Golden Snitches
      </button>
    </StyledActionButtons>
  );
};

const StyledActionButtons = styled.div`
  display: grid;
  width: 100%;
  height: 60px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 5px;

  button {
    cursor: pointer;
    display: inline-block;
    padding: 0.3em 0.5em;
    height: 100%;
    width: 100%;
    border-radius: 2em;
    text-decoration: none;
    color: ${({ theme }) => theme.darkGray};
    background-color: ${({ theme }) => theme.lightGray};
    text-align: center;
    transition: all 0.2s;
    border: none;
    outline: none;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    /* display: none; */
  }

  button:hover {
    background-color: ${({ theme }) => theme.lightAccent};
  }
`;
