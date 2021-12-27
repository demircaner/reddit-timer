import React from 'react';
import styled from 'styled-components';
import SubredditForm from '../components/SubredditForm';
import UnstyledContainer from '../common/Container';
import HeatmapSection from '../components/HeatmapSection';

export default function SearchPage() {
  return (
    <StyledSection>
      <h1>Find the best time for a subreddit</h1>
      <SubredditForm />
      <HeatmapSection />
    </StyledSection>
  );
}

const StyledSection = styled(UnstyledContainer)`
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
