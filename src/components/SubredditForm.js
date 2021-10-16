import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { Button as StyledButton } from '../style/Link';

export default function SubredditForm() {
  const { subreddit } = useParams();
  const [query, setQuery] = useState(subreddit);

  useEffect(() => {
    setQuery(subreddit);
  }, [subreddit]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="subreddit">r/</label>
      <StyledInput
        type="text"
        id="subreddit"
        onChange={handleChange}
        value={query}
      />
      <StyledButton type="submit" as="button">
        Search
      </StyledButton>
    </form>
  );
}

const StyledInput = styled.input`
  width: 370px;
  height: 36px;
  border-radius: 2px;
  border: solid 1px #e6e6e6;
  margin: 0 10px;
`;
