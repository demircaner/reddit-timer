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
