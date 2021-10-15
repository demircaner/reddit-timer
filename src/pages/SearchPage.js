import React from 'react';
import styled from 'styled-components';
import SubredditForm from '../components/SubredditForm';

export default function SearchPage() {
  return (
    <StyledSection>
      <h1>Find the best time for a subreddit</h1>
      <SubredditForm />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
