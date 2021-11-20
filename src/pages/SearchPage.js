import React from 'react';
import styled from 'styled-components';
import SubredditForm from '../components/SubredditForm';
import UnstyledContainer from '../common/Container';
import Heatmap from '../components/Heatmap';

export default function SearchPage() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <StyledSection>
      <h1>Find the best time for a subreddit</h1>
      <SubredditForm />
      <Heatmap />
      <p>
        All times are shown in your timezone
        <strong>{` ${timezone}`}</strong>
      </p>
    </StyledSection>
  );
}

const StyledSection = styled(UnstyledContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
