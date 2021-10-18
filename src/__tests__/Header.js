import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
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
    const text = screen.getByText(/No reactions to your reddit posts/i);
    expect(text).toBeInTheDocument();
  });

  test('navigates to search page when the search link is clicked', () => {
    const { history } = setup();
    const searchLink = screen.getByRole('link', { name: /search/i });
    userEvent.click(searchLink);
    const text = screen.getByText(/Find the best time for a subreddit/i);
    expect(text).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/search/javascript');
  });

  test.each([
    ['How it works', '#how-it-works'],
    ['About', '#about'],
  ])('navigates %s section when %s link is clicked', (link, hash) => {
    const { history } = setup('/search/javascript');
    const onScroll = jest.fn().mockImplementation(() => 'hi');
    const hashLink = screen.getByRole('link', { name: link });
    userEvent.click(hashLink);

    /**
      There are two text with About and How it works on the page
      One in the navigation and the other in the info section
      so you need to use getAll instead of get and pass the right index to get
      the desired text in this case it is 1
     */
    const section = screen.getAllByText(link);
    fireEvent.scroll(section[1]);

    waitFor(() => {
      expect(onScroll).toHaveBeenCalled();
    }, 0);

    expect(history.location.hash).toEqual(hash);
  });
});
