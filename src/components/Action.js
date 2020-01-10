import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import { examine, setCooldownLock } from '../actions';
import { sleep } from '../utility/randomWalk';
import { ActionButtons } from './ActionButtons';

export const Action = props => {
  const [{ gameplay }, dispatch] = useStateValue();
  const [examineTarget, setExamineTarget] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }

  const examineAction = async target => {
    setCooldownLock(true, dispatch);
    const { cooldown } = await examine(dispatch, { name: target });
    sleep(cooldown);
    setCooldownLock(false, dispatch);
  };

  return (
    <StyledAction>
      <StatusIndicator
        onClick={gameplay.currentAction === 'idle' ? () => {} : refreshPage}
        className='flow'
        idle={gameplay.currentAction === 'idle'}
      >
        <h2>{gameplay.currentAction}</h2>
        {gameplay.currentAction === 'idle' ||
        gameplay.currentAction === 'warping' ? (
          ''
        ) : (
          <h4>Click to Stop</h4>
        )}
      </StatusIndicator>
      <ExamineAction>
        <input
          value={examineTarget}
          placeholder='type object to examine...'
          onChange={e => setExamineTarget(e.target.value)}
        />
        <button onClick={() => examineAction(examineTarget)}>Examine</button>
      </ExamineAction>
      <ActionButtons disabled={gameplay.cooldownLock} />
    </StyledAction>
  );
};

const ExamineAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    border: none;
    border-radius: 5px;
    padding: 5px 0;
    width: 200px;
    background-color: ${({ theme }) => theme.darkGray};
    font-family: ${({ theme }) => theme.mono};
    color: ${({ theme }) => theme.lightGray};
    /* border: 1px solid ${{}}; */
    outline: none;
    text-align: center;
    margin-bottom: 5px;
  }

  button {
    cursor: pointer;
    display: inline-block;
    padding: 0.3em 0.5em;
    height: 100%;
    width: 100%;
    border-radius: 2em;
    text-decoration: none;
    color: ${({ theme }) => theme.darkGray};
    background-color: ${({ theme }) => theme.lightGray};
    text-align: center;
    transition: all 0.2s;
    border: none;
    outline: none;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    /* display: none; */
  }

  button:hover {
    background-color: ${({ theme }) => theme.lightAccent};
  }
`;

const StyledAction = styled.div`
  width: 300px;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const StatusIndicator = styled.div`
  width: 200px;
  height: 100px;
  z-index: 10;

  padding: 10px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  cursor: ${({ idle }) => (idle ? 'default' : 'pointer')};
  h4 {
    opacity: 0.7;
    font-weight: 600;
  }

  background-color: ${props =>
    props.idle ? props.theme.lightAccent : '#f8ce85'};
`;
