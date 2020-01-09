import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import { initGame, checkStatus, examine, getBalance, warp } from '../actions';
import {
  getPlayerInfo,
  randomWalk,
  shortestPath,
  mining,
  snitching,
  makeGraph,
  darkWorld
} from '../utility';

export const Dashboard = () => {
  const [{ gameplay }, dispatch] = useStateValue();

  useEffect(() => {
    getPlayerInfo(dispatch);
  }, [dispatch]);

  return (
    <StyledDashboard>
      <div className={`loading-block disabled-${gameplay.cooldownLock}`} />
      <ActionButtons disabled={gameplay.cooldownLock} />
      <PlayerInfo />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.mediumGray};

  .loading-block {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
    opacity: 0.5;
    display: block;
    cursor: not-allowed;

    &.disabled-false {
      display: none;
    }
  }
`;

const PlayerInfo = () => {
  const [{ gameplay }, dispatch] = useStateValue();

  return (
    <StyledPlayerInfo>
      <h3>{gameplay.name}</h3>
      <PlayerProperty>Lambda Coins</PlayerProperty>
      <PlayerValue>{gameplay.coins}</PlayerValue>
      <PlayerProperty>Golden Snitches</PlayerProperty>
      <PlayerValue>{gameplay.snitches}</PlayerValue>
    </StyledPlayerInfo>
  );
};

const StyledPlayerInfo = styled.div`
  display: grid;
  grid-template-columns: 150px 50px;
  width: 200px;
  color: ${({ theme }) => theme.lightGray};
  font-size: 1.4rem;
  margin: 5px 20px;

  h3 {
    color: ${({ theme }) => theme.darkAccent};
  }
`;

const PlayerProperty = styled.div`
  width: 100%;
  position: relative;

  ::after {
    content: ':';
    position: absolute;
    right: 0;
    padding: 0 10px;
    height: 100%;
  }
`;

const PlayerValue = styled.div``;

const ActionButtons = props => {
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
  }
  button:hover {
    background-color: ${({ theme }) => theme.lightAccent};
  }
`;
