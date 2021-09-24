import React from 'react';
import styled from 'styled-components';
import { HeaderLink } from '../style/Link';

export default function Navbar() {
  return (
    <nav>
      <StyledList>
        <li>
          <HeaderLink to="/search/javascript">Search</HeaderLink>
        </li>
        <li>
          <HeaderLink to="/#how-it-works">How it works</HeaderLink>
        </li>
        <li>
          <HeaderLink to="/#about">About</HeaderLink>
        </li>
      </StyledList>
    </nav>
  );
}

const StyledList = styled.ul`
  display: flex;
  margin: 6px 3px 0 0;
`;
