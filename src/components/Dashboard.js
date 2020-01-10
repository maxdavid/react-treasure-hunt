import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import { Action } from './Action';
import { PlayerInfo } from './PlayerInfo';
import { RoomInfo } from './RoomInfo';
import { PlayerWear } from './PlayerWear';
import { Items } from './Items';
import { getPlayerInfo, darkWorld } from '../utility';

export const Dashboard = () => {
  const [{ gameplay }, dispatch] = useStateValue();

  useEffect(() => {
    getPlayerInfo(dispatch);
  }, [dispatch]);
  return (
    <StyledDashboard>
      <ControlModules>
        <div
          className={`horz-flow loading-block disabled-${gameplay.cooldownLock}`}
        >
          <Loader type='ThreeDots' color='#000' height={80} width={80} />
          <div>COOLDOWN...</div>
        </div>
        <PlayerInfo {...gameplay} />
        <RoomInfo {...gameplay} />
        <PlayerWear bodywear={gameplay.bodywear} footwear={gameplay.footwear} />
        <Items />
        <Spacer />
        <Action />
      </ControlModules>
      <MessagesBar className='horz-flow'>
        {gameplay.messages.map(message => {
          if (!message.includes('Dash')) return <div>{message}</div>;
        })}
      </MessagesBar>
    </StyledDashboard>
  );
};

const Spacer = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const DashBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.lightGray};
  font-size: 1.4rem;
  min-height: 30px;
  color: ${({ theme }) => theme.darkGray};
  padding: 5px 0;
`;

const MessagesBar = styled(DashBar)``;

const ControlModules = styled.div`
  --dash-height: 265px;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: var(--dash-height);
  background-color: ${({ theme }) => theme.mediumGray};

  & > div {
    height: var(--dash-height);
  }
`;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  background-color: ${({ theme }) => theme.lightGray};

  .loading-block {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
    opacity: 0.7;
    display: block;
    cursor: not-allowed;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    font-size: 3rem;

    &.disabled-false {
      display: none;
    }
  }
`;
