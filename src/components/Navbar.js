import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Navbar() {
  return (
    <nav>
      <StyledList>
        <li>
          <StyledLink to="/search/javascript">Search</StyledLink>
        </li>
        <li>
          <StyledLink to="/#how-it-works">How it works</StyledLink>
        </li>
        <li>
          <StyledLink to="/#about">About</StyledLink>
        </li>
      </StyledList>
    </nav>
  );
}

const StyledList = styled.ul`
  display: flex;
  margin: 6px 3px 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.midDark};
  margin-left: 26px;
`;
