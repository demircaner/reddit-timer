import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { ReactComponent as UnstyledLogo } from '../assets/images/logo.svg';

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <Navbar />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  padding: 0 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(UnstyledLogo)`
  margin-top: 8px;
`;
