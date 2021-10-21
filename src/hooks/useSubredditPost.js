import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function useSubredditPost() {
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subreddit } = useParams();

  const url = `https://www.reddit.com/r/${subreddit}/top.json?t=year&limit=100`;
  /**
   * Redit API returns 100 posts per request
   * since we need first 500 posts, we need to send 5 requests
   * using pagination in the API
   * https://www.reddit.com/dev/api/
   */
  const fetchSubredditPosts = async (
    numOfRequests = 5,
    after = '',
    // eslint-disable-next-line comma-dangle
    posts = []
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
        await fetchSubredditPosts(numOfRequests - 1, lastId, posts);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
    return posts;
  };

  useEffect(() => {
    fetchSubredditPosts().then((res) => {
      setSubredditPosts(res);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subreddit]);

  return {
    isLoading,
    error,
    subredditPosts,
  };
}
