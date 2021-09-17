import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/images/sign.svg';
import Link from '../style/Link';

export default function Footer() {
  return (
    <StyledFooter>
      <Link as="a" href="https://profy.dev/employers">
        profy.dev
      </Link>
      <Link to="/">
        <Logo />
      </Link>
      <Link to="/terms">Terms & Privacy</Link>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
