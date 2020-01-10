import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

import { ActionButtons } from './ActionButtons';

export const Action = props => {
  const [{ gameplay }, dispatch] = useStateValue();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <StyledAction>
      <StatusIndicator
        onClick={gameplay.currentAction === 'idle' ? () => {} : refreshPage}
        className='flow'
        idle={gameplay.currentAction === 'idle'}
      >
        <h2>{gameplay.currentAction}</h2>
        {gameplay.currentAction === 'idle' ? '' : <h4>Click to Stop</h4>}
      </StatusIndicator>
      <ActionButtons disabled={gameplay.cooldownLock} />
    </StyledAction>
  );
};

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
