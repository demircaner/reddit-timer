// @ts-nocheck
import { renderHook } from '@testing-library/react-hooks';
import useFetchPosts from './useFetchPosts';

const getNumPosts = (nestedPostsArray) => nestedPostsArray.reduce(
  (numTotal, postsPerDay) => postsPerDay.reduce(
    (numPerDay, postsPerHour) => numPerDay + postsPerHour,
    numTotal,
  ),
  0,
);

test('loads 500 top posts from the Reddit API', async () => {
  // eslint-disable-next-line arrow-body-style
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchPosts('500-posts');
  });
  expect(result.current.isLoading).toBe(true);
  expect(result.current.postsPerDay).toEqual([]);

  await waitForNextUpdate({ timeout: 3000 });

  expect(result.current.isLoading).toBe(false);
  expect(getNumPosts(result.current.postsPerDay)).toEqual(500);
  expect(result.current.postsPerDay).toMatchSnapshot();
});

test('stops loading when less than 500 posts are available', async () => {
  // eslint-disable-next-line arrow-body-style
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchPosts('less-than-500-posts');
  });

  await waitForNextUpdate({ timeout: 3000 });

  expect(result.current.isLoading).toBe(false);
  expect(getNumPosts(result.current.postsPerDay)).toEqual(370);
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
