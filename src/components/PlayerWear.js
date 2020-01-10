import React from 'react';
import styled from 'styled-components';
import { removeEquipment } from '../actions';

import { noneImg, bodywearImg, footwearImg } from './assets/img';
import { useStateValue } from '../hooks/useStateValue';

export const PlayerWear = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const { bodywear, footwear } = props;
  return (
    <StyledPlayerWear>
      <Item
        item={bodywear}
        onClick={
          bodywear ? () => removeEquipment(dispatch, { name: bodywear }) : null
        }
      >
        <div>
          <img src={bodywear ? bodywearImg : noneImg} alt='bodywear' />
        </div>
        <h6>{bodywear || 'no bodywear'}</h6>
      </Item>
      <Item
        item={footwear}
        onClick={
          footwear ? () => removeEquipment(dispatch, { name: footwear }) : null
        }
      >
        <div>
          <img src={footwear ? footwearImg : noneImg} alt='footwear' />
        </div>
        <h6>{footwear || 'no footwear'}</h6>
      </Item>
    </StyledPlayerWear>
  );
};

const StyledPlayerWear = styled.div`
  width: 150px;
  background-color: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.lightGray};
  padding: 10px 20px;
  text-align: center;

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
`;

const Item = styled.div`
  width: 100%;
  height: 90px;

  cursor: ${({ item }) => (item ? 'pointer' : 'default')};

  div {
    background-color: ${({ theme }) => theme.mediumGray};
    border-radius: 15px;
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 5px 10px;
      content: 'Take off?';
      display: block;
      color: ${({ theme }) => theme.darkGray};
      background-color: ${({ theme }) => theme.lightAccent};
      border-radius: 10px;
      transition: opacity 0.05s;
      opacity: 0;
      font-size: 1.4rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &:hover::before {
      opacity: 1;
      transition: opacity 0.05s;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  h6 {
    display: block;
    font-weight: 300;
    letter-spacing: 0.1em;
    padding: 10px 0;
  }
`;
