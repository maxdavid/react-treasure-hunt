import React from 'react';
import styled from 'styled-components';

export const PlayerInfo = props => {
  return (
    <StyledPlayerInfo>
      <h2>{props.player_name}</h2>
      {props.name.match(/^User \d/) ? (
        <Nameless>You are nameless.</Nameless>
      ) : (
        ''
      )}
      <Spacer />
      <h3>
        <span>$</span>
        {props.gold}
      </h3>
      <Stats>
        <StatName>Strength</StatName>
        <div>{props.strength}</div>
        <StatName>Speed</StatName>
        <div>{props.speed}</div>
        <StatName>Encumbrance</StatName>
        <div>{props.encumbrance}</div>
      </Stats>
      <Spacer />
      {props.coins > 0 && props.snitches > 0 ? (
        <Stats>
          <StatName>Lambda Coins</StatName>
          <div>{props.coins}</div>
          <StatName>Golden Snitches</StatName>
          <div>{props.snitches}</div>
        </Stats>
      ) : props.coins > 0 ? (
        <Stats>
          <StatName>Lambda Coins</StatName>
          <div>{props.coins}</div>
        </Stats>
      ) : (
        <Stats></Stats>
      )}
    </StyledPlayerInfo>
  );
};

const Spacer = styled.div`
  width: 100%;
  content: '';
  border-bottom: 1px solid ${({ theme }) => theme.darkAccent};
  margin: 10px 0;
`;

const Nameless = styled.div`
  font-weight: 300;
  font-family: ${({ theme }) => theme.mono};
  font-style: italic;
  padding-bottom: 10px;
`;

const StyledPlayerInfo = styled.div`
  min-width: 250px;
  background-color: ${({ theme }) => theme.lightAccent};
  color: ${({ theme }) => theme.darkGray};
  padding: 10px 20px;

  h2 {
    padding: 10px 0;
  }
  h3 {
    padding-top: 5px;
    span {
      color: #00000077;
      padding-right: 3px;
    }
  }
`;

const Stats = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 2fr;
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
