import React from 'react';
import styled from 'styled-components';
import { defaultSubreddit } from '../config';
import { NavLink } from '../style/Link';

export default function Navbar() {
  return (
    <nav>
      <StyledList>
        <li>
          <NavLink to={`/search/${defaultSubreddit}`}>Search</NavLink>
        </li>
        <li>
          <NavLink smooth to="/#how-it-works">
            How it works
          </NavLink>
        </li>
        <li>
          <NavLink smooth to="/#about">
            About
          </NavLink>
        </li>
      </StyledList>
    </nav>
  );
}

const StyledList = styled.ul`
  display: flex;
  margin: 6px 3px 0 0;
`;
