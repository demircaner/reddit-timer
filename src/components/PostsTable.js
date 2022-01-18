import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function PostsTable({ selectedPosts }) {
  return (
    selectedPosts.length > 0 && (
      <Container>
        <h2>Posts</h2>
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
            {selectedPosts.map((post) => {
              const date = new Date(post.data.created_utc * 1000);
              // const hour = date.getHours();
              // const minutes = date.getMinutes();
              // const adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes;

              return (
                <tr key={post.data.id}>
                  <PostTitle>
                    <a href={post.data.url} target="_blank" rel="noreferrer">
                      {post.data.title}
                    </a>
                  </PostTitle>
                  <StyledTableCell>
                    {date
                      .toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                      .toLocaleLowerCase()}
                  </StyledTableCell>
                  <StyledTableCell>{post.data.score}</StyledTableCell>
                  <StyledTableCell>{post.data.num_comments}</StyledTableCell>
                  <StyledTableCell>
                    {post.data.is_author_blocked ? (
                      '[deleted]'
                    ) : (
                      <a
                        href={`https://www.reddit.com/user/${post.data.author}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {post.data.author}
                      </a>
                    )}
                  </StyledTableCell>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </Container>
    )
  );
}

PostsTable.propTypes = {
  selectedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Container = styled.div`
  text-align: left;
  margin-top: 70px;
  width: 60%;
`;

const StyledTable = styled.table`
  margin-top: 10px;
  border-collapse: collapse;
  border: 1px solid ${(props) => props.theme.color.midLight};
  text-align: left;
  color: ${(props) => props.theme.color.dark};
  font-size: ${(props) => props.theme.font.size.small};
`;

const StyledTableHeader = styled.th`
  border-collapse: collapse;
  border: 1px solid ${(props) => props.theme.color.midLight};
  font-weight: 500;
  white-space: nowrap;
  padding: 5px 10px;
`;

const StyledTableCell = styled.td`
  border-collapse: collapse;
  border: 1px solid ${(props) => props.theme.color.midLight};
  padding: 5px 10px;
  font-weight: 400;
`;

const PostTitle = styled(StyledTableCell)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: 0;
`;
