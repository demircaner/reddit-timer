import React from 'react';
import styled from 'styled-components';

export default function InfoSection() {
  return (
    <StyledSection>
      <InfoBlock id="how-it-works">
        <h2>How it works</h2>
        <StyledList>
          <li>We find the 500 top posts from the past year for a subreddit.</li>
          <li>
            The data is visualized in a heatmap grouped by weekday and hour of
            the day.
          </li>
          <li>See immediately when to submit your reddit post.</li>
        </StyledList>
      </InfoBlock>

      <div id="about">
        <h2>About</h2>
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
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  width: 52%;
  max-width: 738px;
  margin: 132px auto;
`;

const InfoBlock = styled.div`
  margin-bottom: 105px;
`;

const StyledList = styled.ul`
  list-style: inside;
  text-indent: -23px;
  margin-left: 23px;
`;
