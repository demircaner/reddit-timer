import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';

export default function Heatmap() {
  const { subreddit } = useParams();
  const { subredditPosts, isLoading, hasError } = useFetchPosts(subreddit);

  if (hasError) return <ErrorDisplay />;
  if (isLoading) return <Spinner />;

  return <div>{subredditPosts.length > 0 && subredditPosts.length}</div>;
}
