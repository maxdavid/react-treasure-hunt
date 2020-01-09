import React from 'react';
import styled from 'styled-components';
import { shortestPath } from '../utility';
import { useStateValue } from '../hooks/useStateValue';

export const Room = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const splitCoords = coords => {
    let split = coords.split(',');
    return [
      parseInt(split[0].slice(1), 10),
      parseInt(split[1].slice(0, -1), 10)
    ];
  };

  if (props.coordinates) {
    const coords = splitCoords(props.coordinates);
    return (
      <StyledRoom
        {...props}
        coords={coords}
        id={`room_${props.room_id}`}
        onClick={() =>
          shortestPath(gameplay.room_id, props.room_id, dispatch, props.reason)
        }
      >
        <GridPiece visible={false} />
        <GridPiece visible={'n' in props && props.n !== null ? true : false} />
        <GridPiece visible={false} />
        <GridPiece visible={'w' in props && props.w !== null ? true : false} />
        <Floor player={props.player}>{props.room_id}</Floor>
        <GridPiece visible={'e' in props && props.e !== null ? true : false} />
        <GridPiece visible={false} />
        <GridPiece visible={'s' in props && props.s !== null ? true : false} />
        <GridPiece visible={false} />
      </StyledRoom>
    );
  } else {
    console.log(`${props.room_id} has no coordinates`);
    return null;
  }
};

const Floor = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${props =>
    props.player ? 'yellow' : props.theme.darkAccent}; */
  background-color: ${({ player }) => (player ? 'yellow' : 'blue')};
  color: ${({ player }) => (player ? 'black' : 'white')};
  font-family: ${({ theme }) => theme.mono};
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GridPiece = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${props =>
    props.visible ? props.theme.lightAccent : 'transparent'}; */
  background-color: ${({ visible }) => (visible ? 'lightblue' : 'transparent')};
`;

const StyledRoom = styled.div`
  --room-size: 25px;
  --room-spacing: calc(var(--room-size) / 2);
  --map-size: ${props => props.mapSize};
  --coord-x: ${({ coords }) => coords[0] - 50};
  --coord-y: ${({ coords }) => coords[1] - 50};
  --north-exit: ${({ n }) => (n || n === 0 ? 'lightblue' : 'transparent')};
  --east-exit: ${({ e }) => (e ? 'lightblue' : 'transparent')};
  --south-exit: ${({ s }) => (s ? 'lightblue' : 'transparent')};
  --west-exit: ${({ w }) => (w ? 'lightblue' : 'transparent')};

  display: grid;
  grid-template-columns: var(--room-spacing) var(--room-size) var(
      --room-spacing
    );
  grid-template-rows: var(--room-spacing) var(--room-size) var(--room-spacing);

  position: absolute;
  bottom: calc(((var(--room-spacing) * 2) + var(--room-size)) * var(--coord-y));
  left: calc(((var(--room-spacing) * 2) + var(--room-size)) * var(--coord-x));

  width: var(--room-size);
  height: var(--room-size);
`;
