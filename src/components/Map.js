import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import worldMap from './assets/map';
import { Room } from './Room';

import { useStateValue } from '../hooks/useStateValue';
import { initGame } from '../actions';
import {randomWalk, shortestPath, mining} from '../utility'

export const Map = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [destinationRoom, setDestinationRoom] = useState('');
  const [desiredTreasure, setDesiredTreasure] = useState('');

  useEffect(() => {
    initGame(dispatch);
  }, [dispatch]);

  const mapSize = props.size || '1000px';
  return (
    <StyledMap size={mapSize}>
        <input value={desiredTreasure} onChange={(e) => setDesiredTreasure(e.target.value)}/>
        <button onClick={() => randomWalk(desiredTreasure, dispatch, gameplay.room_id, gameplay.exits)}>Find Treasure</button>
        <input 
            value={destinationRoom}
            onChange={(e) => setDestinationRoom(e.target.value)}
        />
        <button onClick={() => shortestPath(gameplay.room_id, +destinationRoom, dispatch)}>Go to chosen room</button>
        <button onClick = {() => mining(gameplay.room_id, dispatch)}>Mine Lambda Coin</button>
      {Object.values(worldMap).map(room => (
        <Room
          key={room.room_id}
          mapSize={props.size}
          player={gameplay.room_id === room.room_id}
          {...room}
        />
      ))}
    </StyledMap>
  );
};

const StyledMap = styled.div`
  --map-size: ${props => props.size};

  position: relative;
  width: var(--map-size);
  height: var(--map-size);
  margin: 25px auto;
`;
