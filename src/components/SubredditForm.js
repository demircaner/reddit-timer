import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../common/Button';

export default function SubredditForm() {
  const { subreddit: initialSubreddit } = useParams();
  const [subreddit, setSubreddit] = useState(initialSubreddit);

  useEffect(() => {
    setSubreddit(initialSubreddit);
  }, [initialSubreddit]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${subreddit}`);
  };

  const handleChange = (e) => {
    setSubreddit(e.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="subreddit">r /</StyledLabel>
      <StyledInput
        type="text"
        id="subreddit"
        onChange={handleChange}
        value={subreddit}
      />
      <Button type="submit">Search</Button>
    </StyledForm>
  );
}

export const StyledForm = styled.form`
  margin: 20px 0 0;
  display: flex;
  align-items: center;
`;

export const StyledLabel = styled.label`
  font-size: 18px;
`;

const StyledInput = styled.input`
  width: 370px;
  height: 36px;
  margin: 0 10px;
  padding: 0 15px;
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.color.dark};
  border: 1px solid ${(props) => props.theme.color.midLight};
`;
