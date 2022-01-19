/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';
import Heatmap from './Heatmap';
import PostsTable from './PostsTable';

export default function HeatmapSection() {
  const { subreddit } = useParams();
  // eslint-disable-next-line object-curly-newline
  const { isLoading, hasError, postsPerDay } = useFetchPosts(subreddit);
  const [selectedDayAndHour, setSelectedDayAndHour] = useState({
    day: null,
    hour: null,
  });

  if (hasError) return <ErrorDisplay />;
  if (isLoading) return <Spinner />;

  const { day, hour } = selectedDayAndHour;
  const selectedPosts = postsPerDay[day] && postsPerDay[day][hour];

  const showPostsTable = selectedPosts && selectedPosts.length > 0;

  return (
    <Container as="section">
      <Heatmap
        postsPerDay={postsPerDay}
        selectedDayAndHour={selectedDayAndHour}
        onClickHour={setSelectedDayAndHour}
      />
      {showPostsTable && <PostsTable posts={selectedPosts} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(100% - 40px);
  margin: 60px 20px;
  @media (max-width: ${(props) => props.theme.size.heatmap.width + 40}px) {
    overflow-x: scroll;
  }
`;
