import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';
import Heatmap from './Heatmap';

function HeatmapSection() {
  const { subreddit } = useParams();
  const { isLoading, hasError, postsPerDay } = useFetchPosts(subreddit);
  const [selectedDayAndHour, setSelectedDayAndHour] = useState({
    day: null,
    hour: null,
  });

  if (hasError) return <ErrorDisplay />;
  if (isLoading) return <Spinner />;

  return (
    <Container as="section">
      <Heatmap
        postsPerDay={postsPerDay}
        selectedDayAndHour={selectedDayAndHour}
        onClickHour={setSelectedDayAndHour}
      />
    </Container>
  );
}

export default HeatmapSection;

const Container = styled.div`
  width: calc(100% - 40px);
  margin: 60px 20px;
  @media (max-width: ${(props) => props.theme.size.heatmap.width + 40}px) {
    overflow-x: scroll;
  }
`;
