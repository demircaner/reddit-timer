import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.midDark};
  font-size: ${(props) => props.theme.font.size.small};
`;

export const NavLink = styled(StyledLink)`
  margin-left: 26px;
`;

export const FooterLink = styled(StyledLink)`
  flex: 1;
`;

export const Button = styled(Link)`
  padding: 10px 16px;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: 500;
  color: ${(props) => props.theme.color.light};
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
`;
