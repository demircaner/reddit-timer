import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UnstyledLogo } from '../assets/images/sign.svg';
import Link from '../style/Link';

export default function Footer() {
  return (
    <StyledFooter>
      <LeftLink as="a" href="https://profy.dev/employers">
        profy.dev
      </LeftLink>
      <Link to="/">
        <Logo />
      </Link>
      <RightLink to="/terms">Terms & Privacy</RightLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  max-width: 980px;
  height: ${(props) => props.theme.size.footerHeight};
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  background-color: aquamarine;
`;

const Logo = styled(UnstyledLogo)`
  display: block;
`;

const LeftLink = styled(Link)`
  text-align: left;
`;

const RightLink = styled(Link)`
  text-align: right;
`;
