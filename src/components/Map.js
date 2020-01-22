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
  darkWorld,
} from '../utility';

export const Map = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [destinationRoom, setDestinationRoom] = useState('');
  const [desiredTreasure, setDesiredTreasure] = useState('');

  const mapSize = props.size || '1000px';
  let currentMap = gameplay.room_id < 500 ? worldMap : darkWorld;
  let reason = gameplay.room_id < 500 ? 'mining' : 'snitching';

  useEffect(() => {
    document.body.style.backgroundColor =
      gameplay.dimension === 'dark' ? '#3b3f3f' : 'white';
  }, [gameplay.dimension]);

  return (
    <StyledMap dark={gameplay.dimension === 'dark'} size={mapSize}>
      {gameplay.dimension === 'light' ? (
        <h2>Lambda Treasure Island</h2>
      ) : (
        <h2 dark>The Dark Dimension</h2>
      )}
      {Object.values(currentMap).map(room => (
        <Room
          reason={reason}
          dark={gameplay.dimension === 'dark'}
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
  h2 {
    position: absolute;
    top: 40px;
    left: 40px;
    font-size: 6rem;
    color: ${props =>
      props.dark ? props.theme.lightGray : props.theme.darkGray};
  }

  position: relative;
  width: 100vw;
  height: 1440px;
`;
