import React from 'react';
import styled from 'styled-components';

export default function Spinner() {
  return <StyledDiv data-testid="spinner" />;
}

const StyledDiv = styled.div`
  width: 71px;
  height: 71px;
  border: 5px solid ${(props) => props.theme.color.primary};
  border-left-color: transparent;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;
