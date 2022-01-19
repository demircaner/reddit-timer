/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { postType } from '../types/index';

function sortPosts(posts) {
  return [...posts].sort(
    (a, b) => a.createdAt.getMinutes() - b.createdAt.getMinutes(),
  );
}

function getDisplayTime({ createdAt }) {
  return createdAt
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLowerCase();
}

export default function PostsTable({ posts }) {
  return (
    <Container>
      <StyledHeadline>Posts</StyledHeadline>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableHeader>Title</StyledTableHeader>
            <StyledTableHeader>Time Posted</StyledTableHeader>
            <StyledTableHeader>Score</StyledTableHeader>
            <StyledTableHeader>Comments</StyledTableHeader>
            <StyledTableHeader>Author</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {sortPosts(posts).map((post) => (
            <tr key={post.url}>
              <StyledTitleColumn>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </StyledTitleColumn>
              <StyledTableCell>{getDisplayTime(post)}</StyledTableCell>
              <StyledTableCell>{post.score}</StyledTableCell>
              <StyledTableCell>{post.numComments}</StyledTableCell>
              <StyledAuthorColumn>
                {post.author === '[deleted]' ? (
                  '[deleted]'
                ) : (
                  <a
                    href={`https://www.reddit.com/user/${post.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.author}
                  </a>
                )}
              </StyledAuthorColumn>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

PostsTable.propTypes = {
  posts: PropTypes.arrayOf(postType).isRequired,
};

const Container = styled.div`
  margin: 20px auto;
  width: 786px;
`;

const StyledHeadline = styled.h2`
  margin-bottom: 4px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  text-align: left;
  color: ${(props) => props.theme.color.dark};
  font-size: ${(props) => props.theme.font.size.small};
`;

const StyledTableHeader = styled.th`
  border: 1px solid ${(props) => props.theme.color.midLight};
  font-weight: 500;
  white-space: nowrap;
  padding: 0 12px 0 11px;
`;

const StyledTableCell = styled.td`
  border: 1px solid ${(props) => props.theme.color.midLight};
  padding: 0 12px;
  font-weight: 400;
  line-height: 33px;
`;

const singleLineEllipsis = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledTitleColumn = styled(StyledTableCell)`
  width: 373px;
  max-width: 373px;
  ${singleLineEllipsis}
`;

const StyledAuthorColumn = styled(StyledTableCell)`
  width: 129px;
  max-width: 129px;
  ${singleLineEllipsis}
`;
