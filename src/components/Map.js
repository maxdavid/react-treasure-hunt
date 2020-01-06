import React from 'react';
import styled from 'styled-components';
import worldMap from './assets/map';
import { Room } from './Room';

export const Map = props => {
  const mapSize = props.size || '1000px';
  return (
    <StyledMap size={mapSize}>
      {Object.values(worldMap).map(room => (
        <Room key={room.room_id} mapSize={props.size} {...room} />
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
