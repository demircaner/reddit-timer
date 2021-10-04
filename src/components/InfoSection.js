import React from 'react';
import styled from 'styled-components';
import Info from './Info';

export default function InfoSection() {
  return (
    <StyledArticle>
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
    </StyledArticle>
  );
}

const StyledArticle = styled.section`
  width: 100%;
  max-width: 778px;
  margin: 32px auto 0;
  padding: 0 20px;
`;

const StyledList = styled.ul`
  list-style: inside;
  text-indent: -23px;
  margin-left: 23px;
`;
