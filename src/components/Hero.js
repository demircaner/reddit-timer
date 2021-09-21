import React from 'react';
import styled from 'styled-components';

export default function Hero() {
  return (
    <StyledContainer>
      <Title>No reactions to your reddit posts?</Title>
      <Subtitle>
        Great timing, great results! Find the best time to post on your
        subreddit.
      </Subtitle>
      <StyledButton type="button">SHOW ME THE BEST TIME</StyledButton>
      <Subreddit>r/javascript</Subreddit>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1084px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: ${(props) => props.theme.font.family.headline};
  color: ${(props) => props.theme.color.dark};
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.font.size.small};
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.btnPrimary};
  color: ${(props) => props.theme.color.light};
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: ${(props) => props.theme.font.size.small};
`;

const Subreddit = styled.p`
  color: ${(props) => props.theme.color.text};
`;
