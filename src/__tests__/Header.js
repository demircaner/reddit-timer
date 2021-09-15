import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

function setup(initialPath = '/') {
  // https://reactrouter.com/web/guides/testing/checking-location-in-tests
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

describe('Header', () => {
  test('navigates to home page when logo is clicked', () => {
    setup('/search/javascript');
    const logoLink = screen.getByRole('link', { name: /logo\.svg/i });
    userEvent.click(logoLink);
    const text = screen.getByText(/home page/i);
    expect(text).toBeInTheDocument();
  });

  test('navigates to search page when the search link is clicked', () => {
    const { history } = setup();
    const searchLink = screen.getByRole('link', { name: /search/i });
    userEvent.click(searchLink);
    const text = screen.getByText(/search page/i);
    expect(text).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/search/javascript');
  });

  test.each([
    ['About', '#about'],
    ['How it works', '#how-it-works'],
  ])('navigates %s section when %s link is clicked', (link, hash) => {
    const { history } = setup('/search/javascript');

    const hashLink = screen.getByRole('link', { name: link });
    userEvent.click(hashLink);

    const text = screen.getByText(/home page/i);
    expect(text).toBeInTheDocument();

    expect(history.location.hash).toEqual(hash);
  });
});
