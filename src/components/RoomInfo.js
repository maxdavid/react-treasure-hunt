import React from 'react';
import styled from 'styled-components';

export const RoomInfo = props => {
  return (
    <StyledRoomInfo>
      <div>
        <h2>ROOM {props.room_id}</h2>
        <h3>{props.title}</h3>
        <RoomDescription>{props.description}</RoomDescription>
      </div>
      <Stats>
        <StatName>Coordinates</StatName>
        <div>{props.coordinates}</div>
        <StatName>Terrain</StatName>
        <div>{props.terrain}</div>
        <StatName>Elevation</StatName>
        <div>{props.elevation}</div>
      </Stats>
    </StyledRoomInfo>
  );
};

const RoomDescription = styled.div`
  font-size: 1.4rem;
  /* font-family: ${({ theme }) => theme.mono}; */
  padding: 5px 0;
  font-weight: 300;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`;

const StyledRoomInfo = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.darkAccent};
  color: ${({ theme }) => theme.darkGray};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  h2 {
    padding: 10px 0;
  }
  h3 {
    padding: 5px 0;
    font-weight: 700;
  }
`;

const Stats = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  padding: 10px 0;
  font-size: 1.6rem;
`;
const StatName = styled.div`
  width: 100%;
  position: relative;
  font-weight: 600;

  ::after {
    content: ':';
    position: absolute;
    right: 0;
    padding: 0 10px;
    height: 100%;
    opacity: 0.3;
  }
`;
