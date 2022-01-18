/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';
import Heatmap from './Heatmap';
import PostsTable from './PostsTable';

const filterSelectedPosts = (
  posts,
  selectedDay,
  selectedHour,
  filteredPosts = [],
) => {
  posts.forEach((post) => {
    const createdAt = new Date(post.data.created_utc * 1000);
    const day = createdAt.getDay();
    const hour = createdAt.getHours();

    if (day === selectedDay && hour === selectedHour) {
      filteredPosts.push(post);
    }
  });

  filteredPosts.sort((a, b) => {
    const time1 = new Date(a.data.created_utc * 1000).toLocaleTimeString();
    const time2 = new Date(b.data.created_utc * 1000).toLocaleTimeString();

    return new Date(`1970/01/01 ${time1}`) - new Date(`1970/01/01 ${time2}`);
  });

  return filteredPosts;
};

export default function HeatmapSection() {
  const { subreddit } = useParams();
  // eslint-disable-next-line object-curly-newline
  const { isLoading, hasError, postsPerDay, subredditPosts } =
    useFetchPosts(subreddit);
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
      {selectedDayAndHour.day !== null && (
        <PostsTable
          selectedPosts={filterSelectedPosts(
            subredditPosts,
            selectedDayAndHour.day,
            selectedDayAndHour.hour,
          )}
        />
      )}
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
