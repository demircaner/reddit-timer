import React from 'react';
import useSubredditPost from '../hooks/useSubredditPost';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';

export default function SubredditPosts() {
  const { subredditPosts, isLoading, error } = useSubredditPost();

  return (
    <div>
      {error && <ErrorDisplay />}
      {isLoading && <Spinner />}
      {subredditPosts.length > 0 && subredditPosts.length}
    </div>
  );
}
