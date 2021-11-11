// @ts-nocheck
import { renderHook } from '@testing-library/react-hooks';
import useFetchPosts from './useFetchPosts';

test('loads 500 top posts from the Reddit API', async () => {
  const { result, waitForNextUpdate } = renderHook(() => {
    useFetchPosts('500-posts');
  });
  expect(result.current.isLoading).toBe(true);
  expect(result.current.subRedditPosts).toEqual([]);

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.subRedditPosts.length).toEqual(500);

  const postTitles = result.current.subredditPosts.map(
    ({ data }) => data.title,
  );
  expect(postTitles).toMatchSnapshot();
});

test('stops loading when less than 500 posts are available', async () => {
  const { result, waitForNextUpdate } = renderHook(() => {
    useFetchPosts('less-than-500-posts');
  });

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.subredditPosts.length).toEqual(270);
});

test('returns error when a request fails', async () => {
  const { result, waitForNextUpdate } = renderHook(() => {
    useFetchPosts('failing-request');
  });

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.hasError).toEqual(true);
});
