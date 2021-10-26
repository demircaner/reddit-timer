import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Redit API returns 100 posts per request
 * since we need first 500 posts, we need to send 5 requests
 * using pagination in the API
 * https://www.reddit.com/dev/api/
 */
const fetchSubredditPosts = async (
  url,
  setError,
  setIsLoading,
  numOfRequests = 5,
  after = '',
  posts = [],
) => {
  if (numOfRequests > 0) {
    let pageURL = url;
    let lastId = after;

    if (lastId.length > 0) {
      pageURL += `&after=${lastId}`;
    }

    try {
      const res = await fetch(pageURL);
      if (!res.ok) {
        throw new Error(`The status of the response is: ${res.status}`);
      }
      const data = await res.json();
      lastId = data.data.after;
      posts.push(...data.data.children);
      await fetchSubredditPosts(
        url,
        setError,
        setIsLoading,
        numOfRequests - 1,
        lastId,
        posts,
      );
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }
  return posts;
};

export default function useSubredditPost() {
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subreddit } = useParams();

  const url = `https://www.reddit.com/r/${subreddit}/top.json?t=year&limit=100`;

  useEffect(() => {
    fetchSubredditPosts(url, setError, setIsLoading).then((res) => {
      setSubredditPosts(res);
      setIsLoading(false);
    });
  }, [subreddit, url]);

  return {
    isLoading,
    error,
    subredditPosts,
  };
}
