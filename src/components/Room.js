import React from 'react';
import styled from 'styled-components';
import { shortestPath } from '../utility';
import { setCurrentAction, setCooldownLock } from '../actions';
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

  const navigate = async (curr, dest, dispatch, reason) => {
    setCurrentAction('navigating', dispatch);
    setCooldownLock(true, dispatch);
    await shortestPath(curr, dest, dispatch, reason);
    setCooldownLock(false, dispatch);
    setCurrentAction('idle', dispatch);
  };

  if (props.coordinates) {
    const coords = splitCoords(props.coordinates);
    return (
      <StyledRoom
        {...props}
        coords={coords}
        id={`room_${props.room_id}`}
        dark={props.dark}
        onClick={() =>
          navigate(gameplay.room_id, props.room_id, dispatch, props.reason)
        }
      >
        <GridPiece dark={props.dark} visible={false} />
        <GridPiece
          dark={props.dark}
          visible={'n' in props && props.n !== null ? true : false}
        />
        <GridPiece dark={props.dark} visible={false} />
        <GridPiece
          dark={props.dark}
          visible={'w' in props && props.w !== null ? true : false}
        />
        <Floor dark={props.dark} player={props.player}>
          {props.room_id}
        </Floor>
        <GridPiece
          dark={props.dark}
          visible={'e' in props && props.e !== null ? true : false}
        />
        <GridPiece dark={props.dark} visible={false} />
        <GridPiece
          dark={props.dark}
          visible={'s' in props && props.s !== null ? true : false}
        />
        <GridPiece dark={props.dark} visible={false} />
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
  background-color: ${props =>
    props.dark
      ? props.player
        ? 'blue'
        : '#ff9800CC'
      : // : props.theme.darkerOrange
      props.player
      ? 'yellow'
      : 'blue'};
  color: ${props =>
    props.dark
      ? props.player
        ? 'white'
        : props.theme.darkGray
      : props.player
      ? 'black'
      : 'white'};
  font-weight: 600;
  letter-spacing: 0.05;
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
  background-color: ${props =>
    props.dark
      ? props.visible
        ? '#ffb74dCC'
        : // ? props.theme.mediumOrange
          'transparent'
      : props.visible
      ? 'lightblue'
      : 'transparent'};
`;

const StyledRoom = styled.div`
  --room-size: 25px;
  --room-spacing: calc(var(--room-size) / 2);
  --map-size: ${props => props.mapSize};
  --dark-offset: ${({ dark }) => (dark ? 0 : 3)};
  --coord-x: calc(${({ coords }) => coords[0] - 46} - var(--dark-offset));
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
  left: calc((((var(--room-spacing) * 2) + var(--room-size)) * var(--coord-x)));

  width: var(--room-size);
  height: var(--room-size);
`;
