// @ts-nocheck
import { renderHook } from '@testing-library/react-hooks';
import useFetchPosts from './useFetchPosts';

test('loads 500 top posts from the Reddit API', async () => {
  // eslint-disable-next-line arrow-body-style
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchPosts('500-posts');
  });
  expect(result.current.isLoading).toBe(true);
  expect(result.current.subredditPosts).toEqual([]);

  await waitForNextUpdate({ timeout: 3000 });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.subredditPosts.length).toEqual(500);

  const postTitles = result.current.subredditPosts.map(
    ({ data }) => data.title,
  );
  expect(postTitles).toMatchSnapshot();
});

test('stops loading when less than 500 posts are available', async () => {
  // eslint-disable-next-line arrow-body-style
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchPosts('less-than-500-posts');
  });

  await waitForNextUpdate({ timeout: 3000 });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.subredditPosts.length).toEqual(370);
});

test('returns error when a request fails', async () => {
  // eslint-disable-next-line arrow-body-style
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchPosts('failing-request');
  });

  await waitForNextUpdate({ timeout: 3000 });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.hasError).toEqual(true);
});
