import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heatmap from '../assets/images/heatmap.png';

export default function Hero() {
  return (
    <StyledContainer>
      <Title>No reactions to your reddit posts?</Title>
      <Subtitle>
        Great timing, great results! Find the best time to post on your
        subreddit.
      </Subtitle>
      <Link to="/search/javascript">
        <StyledButton type="button">SHOW ME THE BEST TIME</StyledButton>
      </Link>
      <Subreddit>r/javascript</Subreddit>
      <Link to="/search/javascript">
        <img src={heatmap} alt="heatmap of reddit posts" />
      </Link>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1084px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-family: ${(props) => props.theme.font.family.headline};
  color: ${(props) => props.theme.color.dark};
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.font.size.small};
  margin-bottom: 45px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.btnPrimary};
  color: ${(props) => props.theme.color.light};
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: ${(props) => props.theme.font.size.small};
  cursor: pointer;
`;

const Subreddit = styled.p`
  color: ${(props) => props.theme.color.text};
  margin-bottom: 36px;
`;
