import React, { useState } from 'react';
import styled from 'styled-components';
import { getPlayerInfo } from '../utility';
import { useStateValue } from '../hooks/useStateValue';

export const Header = () => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [override, setOverride] = useState('');

  const setOverrideToken = token => {
    process.env['OVERRIDE_TOKEN'] = token;
    getPlayerInfo(dispatch);
    console.log(process.env.OVERRIDE_TOKEN);
  };

  return (
    <StyledHeader className='horz-flow'>
      <div>
        <h1>Lambda Treasure Hunt</h1>
      </div>
      <Spacer />
      <OverrideInput>
        <input value={override} onChange={e => setOverride(e.target.value)} />
        <button onClick={() => setOverrideToken(override)}>
          Set Override API Key
        </button>
      </OverrideInput>
    </StyledHeader>
  );
};

const Spacer = styled.div`
  flex-grow: 1;
`;

const OverrideInput = styled.div`
  button {
    margin: 0 5px;
  }
  input {
    border: none;
    border-radius: 5px;
    padding: 2px 0;
    width: 200px;
    background-color: ${({ theme }) => theme.mediumGray};
    font-family: ${({ theme }) => theme.mono};
    color: ${({ theme }) => theme.lightGray};
    outline: none;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.lightGray};

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
