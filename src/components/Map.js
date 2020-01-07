import React, { useEffect } from 'react';
import styled from 'styled-components';
import worldMap from './assets/map';
import { Room } from './Room';

import { useStateValue } from '../hooks/useStateValue';
import { initGame } from '../actions';

export const Map = props => {
  const [{ gameplay }, dispatch] = useStateValue();

  useEffect(() => {
    initGame(dispatch);
  }, [dispatch]);

  const mapSize = props.size || '1000px';
  return (
    <StyledMap size={mapSize}>
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
