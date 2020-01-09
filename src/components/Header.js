import React from 'react';
import styled from 'styled-components';

export const Header = () => {
  return (
    <StyledHeader className='horz-flow'>
      <div>
        <h1>Lambda Treasure Hunt</h1>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.lightGray};

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
