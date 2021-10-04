import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Info({ id, headline, children }) {
  return (
    <StyledArticle id={id}>
      <StyledHeadline>{headline}</StyledHeadline>
      <StyledContent>{children}</StyledContent>
    </StyledArticle>
  );
}

Info.propTypes = {
  id: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const StyledArticle = styled.article`
  margin: 100px 0;
`;

const StyledHeadline = styled.h2`
  margin: 0;
`;

const StyledContent = styled.div`
  margin-top: 7px;
`;
