import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import { initGame, checkStatus, examine, getBalance, warp } from '../actions';
import {
  randomWalk,
  shortestPath,
  mining,
  snitching,
  makeGraph,
  darkWorld
} from '../utility';

export const ActionButtons = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [destinationRoom, setDestinationRoom] = useState('');
  const [desiredTreasure, setDesiredTreasure] = useState('');
  let reason = gameplay.room_id < 500 ? 'mining' : 'snitching';

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
      <button onClick={() => warp(dispatch)}>Warp</button>
      <button onClick={() => mining(gameplay.room_id, dispatch)}>
        Mine Lambda Coins
      </button>
      <button onClick={() => snitching(gameplay.room_id, dispatch)}>
        Find Golden Snitches
      </button>
    </StyledActionButtons>
  );
};

const StyledActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  button {
    cursor: pointer;
    display: inline-block;
    padding: 0.3em 1.5em;
    margin: 0 0.3em 0.5em 0;
    border-radius: 2em;
    text-decoration: none;
    color: ${({ theme }) => theme.darkGray};
    background-color: ${({ theme }) => theme.lightGray};
    text-align: center;
    transition: all 0.2s;
    border: none;
    outline: none;
  }
  button:hover {
    background-color: ${({ theme }) => theme.lightAccent};
  }
`;
