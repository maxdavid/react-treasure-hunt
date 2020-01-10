import React from 'react';
import styled from 'styled-components';
import {
  examine,
  grabItem,
  dropItem,
  wearEquipment,
  initGame,
  checkStatus,
  setCooldownLock
} from '../actions';
import { sleep } from '../utility/randomWalk';
import { useStateValue } from '../hooks/useStateValue';

export const Items = () => {
  const [{ gameplay }, dispatch] = useStateValue();

  const grab = async item => {
    setCooldownLock(true, dispatch);
    const { cooldown } = await grabItem(dispatch, { name: item });
    sleep(cooldown);
    await checkStatus(dispatch);
    sleep(1);
    await initGame(dispatch);
    setCooldownLock(false, dispatch);
  };

  const drop = async item => {
    setCooldownLock(true, dispatch);
    const { cooldown } = await dropItem(dispatch, {
      name: item,
      confirm: 'yes'
    });
    sleep(cooldown);
    await checkStatus(dispatch);
    setCooldownLock(false, dispatch);
  };

  return (
    <StyledItems>
      <div>
        <h2>Inventory</h2>
        <Inventory className='flow'>
          {gameplay.inventory.map(item => (
            <ItemRow>
              <Item onClick={() => examine(dispatch, { name: item })}>
                {item}
              </Item>
              <div
                className='button'
                onClick={() => wearEquipment(dispatch, { name: item })}
              >
                Wear
              </div>
              <div className='button warn' onClick={() => drop(item)}>
                Drop
              </div>
            </ItemRow>
          ))}
        </Inventory>
      </div>
      <div>
        <h3>Room Items</h3>
        <Inventory className='flow'>
          {gameplay.items.map(item => (
            <ItemRow>
              <Item onClick={() => examine(dispatch, { name: item })}>
                {item}
              </Item>
              <div className='button grab' onClick={() => grab(item)}>
                Grab
              </div>
            </ItemRow>
          ))}
        </Inventory>
      </div>
    </StyledItems>
  );
};

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.darkGray};

  & > * + * {
    margin-left: 0.2em;
  }

  .button {
    display: block;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 10px;
    font-weight: 300;
    background-color: ${({ theme }) => theme.lightAccent};

    &:hover {
      opacity: 0.8;
    }

    &.warn {
      background-color: #f9daa3;
    }
  }
`;

const StyledItems = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 20px;
  width: 100%;
  height: 100%;

  padding: 20px;
  width: 480px;
  height: 100%;
  color: ${({ theme }) => theme.lightGray};
  h2,
  h3 {
    padding-bottom: 20px;
    text-transform: uppercase;
  }
  h3 {
    font-size: 2rem;
    padding-bottom: 25px;
  }
`;

const Inventory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * + * {
    margin-top: 0.5em;
  }
`;

const Item = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.darkGray};
  padding: 5px 7px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  font-size: 1.2rem;
  flex-grow: 1;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 5px 10px;
    content: 'Examine?';
    display: none;
    background-color: ${({ theme }) => theme.lightAccent};
    border-radius: 10px;
    transition: all 0.1s;
  }

  &:hover::before {
    display: block;
    transition: all 0.1s;
  }
`;
