import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
const Button = styled.button`
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: 500;
  color: ${(props) => props.theme.color.light};
  background: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
`;

export default Button;
