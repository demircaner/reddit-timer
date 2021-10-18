import React from 'react';
import styled from 'styled-components';
import Info from './Info';
import UnstyledContainer from '../common/Container';

export default function InfoSection() {
  return (
    <Container as="section">
      <Info id="how-it-works" headline="How it works">
        <StyledList>
          <li>We find the 500 top posts from the past year for a subreddit.</li>
          <li>
            The data is visualized in a heatmap grouped by weekday and hour of
            the day.
          </li>
          <li>See immediately when to submit your reddit post.</li>
        </StyledList>
      </Info>

      <Info id="about" headline="About">
        <p>
          This app was created during a course on
          {' '}
          <a href="https://profy.dev" target="_blank" rel="noreferrer">
            profy.dev
          </a>
          {' '}
          with the goal to implement a pixel-perfect real-world application with
          professional workflows and tools like Kanban, ClickUp, Figma, GitHub,
          pull requests and code reviews.
          {' '}
          <a
            href="https://profy.dev/employers"
            target="_blank"
            rel="noreferrer"
          >
            Click here for more information.
          </a>
          {' '}
        </p>
      </Info>
    </Container>
  );
}

const Container = styled(UnstyledContainer)`
  margin-top: 119px;
`;

const StyledList = styled.ul`
  list-style: inside;
  text-indent: -23px;
  margin-left: 23px;
`;
