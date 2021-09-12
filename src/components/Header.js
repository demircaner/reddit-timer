import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import Navbar from './Navbar';

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <Navbar />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 32px 78px 72px;
`;
