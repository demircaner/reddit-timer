import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';

function setup(initialPath = '/') {
  let history;
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
      <Route
        path="*"
        render={(props) => {
          history = props.history;
          return null;
        }}
      />
    </MemoryRouter>,
  );
  return { history };
}

describe('Subreddit Form', () => {
  test('Input has value of javascript when you navigate to search page', () => {
    setup('/search/javascript');
    const subredditInput = screen.getByLabelText('r/');
    expect(subredditInput.value).toEqual('javascript');
  });

  test('Updates the URL with the input value when search button is clicked', () => {
    const { history } = setup('/search/javascript');
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.click(searchButton);
    const subredditInput = screen.getByLabelText('r/');
    expect(history.location.pathname).toEqual(
      `/search/${subredditInput.value}`,
    );
  });
});
