import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.midDark};
  margin-left: 26px;
`;

export default StyledLink;
