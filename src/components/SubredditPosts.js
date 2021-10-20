import React from 'react';
import useSubredditPost from '../hooks/useSubredditPost';
import Spinner from './Spinner';

export default function SubredditPosts() {
  const { subredditPosts, isLoading } = useSubredditPost();
  return (
    <div>
      {isLoading && <Spinner />}
      {subredditPosts && JSON.stringify(subredditPosts[0])}
    </div>
  );
}
