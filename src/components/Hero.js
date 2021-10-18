import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heatmap from '../assets/images/heatmap.png';
import { defaultSubreddit } from '../config';
import UnstyledButton from '../common/Button';

export default function Hero() {
  return (
    <StyledSection>
      <Title>No reactions to your reddit posts?</Title>
      <Subtitle>
        Great timing, great results! Find the best time to post on your
        subreddit.
      </Subtitle>

      <Button as={Link} to={`/search/${defaultSubreddit}`}>
        Show me the best time
      </Button>

      <Subreddit>
        r/
        {defaultSubreddit}
      </Subreddit>
      <Link to={`/search/${defaultSubreddit}`}>
        <StyledImage src={heatmap} alt="heatmap of reddit posts" />
      </Link>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin-top: 19px;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.font.size.small};
  margin: 6px 0 42px;
  letter-spacing: ${(props) => props.theme.font.letterSpacing.default};
`;

const Button = styled(UnstyledButton)`
  text-decoration: none;
  margin-bottom: 45px;
`;

const Subreddit = styled.p`
  color: ${(props) => props.theme.color.text};
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 1114px;
  margin-top: 32px;
`;
