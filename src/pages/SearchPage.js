import React from 'react';
import styled from 'styled-components';
import SubredditForm from '../components/SubredditForm';
import UnstyledContainer from '../common/Container';
import SubredditPosts from '../components/SubredditPosts';

export default function SearchPage() {
  return (
    <StyledSection>
      <h1>Find the best time for a subreddit</h1>
      <SubredditForm />
      <SubredditPosts />
    </StyledSection>
  );
}

const StyledSection = styled(UnstyledContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
