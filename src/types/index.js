/* eslint-disable object-curly-newline */
import { instanceOf, number, shape, string } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const postType = shape({
  createdAt: instanceOf(Date).isRequired,
  title: string.isRequired,
  url: string.isRequired,
  score: number.isRequired,
  numComments: number.isRequired,
  author: string.isRequired,
  authorId: string, // undefined if user has been deleted
});
