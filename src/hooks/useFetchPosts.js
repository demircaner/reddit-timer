import { useEffect, useState } from 'react';

export async function fetchPaginatedPosts(
  subreddit,
  signal,
  previousPosts = [],
  after = null,
) {
  let url = `https://www.reddit.com/r/${subreddit}/top.json?t=year&limit=100`;
  if (after) {
    url += `&after=${after}`;
  }
  const response = await fetch(url, { signal });
  const { data } = await response.json();
  const allPosts = previousPosts.concat(data.children);

  const noMorePosts = data && data.dist < 100;
  const limitReached = allPosts.length >= 500;
  if (noMorePosts || limitReached) {
    return allPosts;
  }

  // the function calls itself and provides the after cursor of the
  // newly fetched response
  return fetchPaginatedPosts(subreddit, signal, allPosts, data.after);
}

function useFetchPosts(subreddit) {
  const [subredditPosts, setPosts] = useState([]);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    let controller = new AbortController();
    const { signal } = controller;
    setStatus('pending');

    fetchPaginatedPosts(subreddit, signal)
      .then((newPosts) => {
        setPosts(newPosts);
        setStatus('resolved');
        controller = null;
      })
      .catch(() => {
        setStatus('rejected');
      });

    return () => {
      controller?.abort();
      setPosts([]);
      setStatus('pending');
    };
  }, [subreddit]);

  return {
    isLoading: status === 'pending',
    hasError: status === 'rejected',
    subredditPosts,
  };
}

export default useFetchPosts;
