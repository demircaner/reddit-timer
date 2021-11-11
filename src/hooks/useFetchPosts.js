import { useEffect, useState } from 'react';

export async function fetchPaginatedPosts(
  subreddit,
  previousPosts = [],
  after = null,
) {
  let url = `https://www.reddit.com/r/${subreddit}/top.json?t=year&limit=100`;
  if (after) {
    url += `&after=${after}`;
  }
  const response = await fetch(url);
  const { data } = await response.json();
  const allPosts = previousPosts.concat(data.children);

  const noMorePosts = data && data.dist < 100;
  const limitReached = allPosts.length >= 500;
  if (noMorePosts || limitReached) {
    return allPosts;
  }

  // the function calls itself and provides the after cursor of the
  // newly fetched response
  return fetchPaginatedPosts(subreddit, allPosts, data.after);
}

function useFetchPosts(subreddit) {
  const [subredditPosts, setPosts] = useState([]);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setStatus('pending');

    fetchPaginatedPosts(subreddit)
      .then((newPosts) => {
        setPosts(newPosts);
        setStatus('resolved');
      })
      .catch(() => setStatus('rejected'));
  }, [subreddit]);

  return {
    isLoading: status === 'pending',
    hasError: status === 'rejected',
    subredditPosts,
  };
}

export default useFetchPosts;
