import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import worldMap from './assets/map';
import { Room } from './Room';

import { useStateValue } from '../hooks/useStateValue';
import { initGame, warp } from '../actions';
import {
  randomWalk,
  shortestPath,
  mining,
  snitching,
  makeGraph,
  darkWorld
} from '../utility';

export const Map = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [destinationRoom, setDestinationRoom] = useState('');
  const [desiredTreasure, setDesiredTreasure] = useState('');

  const mapSize = props.size || '1000px';
  let currentMap = gameplay.room_id < 500 ? worldMap : darkWorld;
  let reason = gameplay.room_id < 500 ? 'mining' : 'snitching';

  return (
    <StyledMap size={mapSize}>
      {Object.values(currentMap).map(room => (
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
