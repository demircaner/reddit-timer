import React from 'react';
// eslint-disable-next-line object-curly-newline
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';
import { defaultSubreddit } from '../config';

function setup(initialPath = '/') {
  let history;
  const view = render(
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
  return { ...view, history };
}

describe('Subreddit Form', () => {
  test('Input value changes to defaultsubreddit when you navigate to search page', () => {
    setup('/search/reactjs');
    const subredditInput = screen.getByRole('textbox');
    const header = screen.getByRole('banner');
    const searchLink = within(header).getByRole('link', { name: /Search/ });

    userEvent.click(searchLink);
    expect(subredditInput.value).toBe(defaultSubreddit);
  });

  test('Updates the URL with the input value when search button is clicked', () => {
    const { history } = setup('/search/reactjs');
    const subredditInput = screen.getByLabelText('r /');
    expect(subredditInput.value).toBe('reactjs');

    userEvent.clear(subredditInput);
    userEvent.type(subredditInput, 'vuejs');
    expect(subredditInput.value).toBe('vuejs');

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.click(searchButton);
    expect(history.location.pathname).toEqual('/search/vuejs');
  });

  // test('Loads top posts for the subreddit in the URL', async () => {
  //   setup('/search/javascript');
  //   const spinner = screen.getByTestId('spinner');
  //   expect(spinner).toBeInTheDocument();
  //   await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument(), {
  //     timeout: 8000,
  //   });
  //   const box = screen.getAllByRole('gridcell')[0];
  //   fireEvent.click(box);
  //   expect(box).toHaveStyle('outline: 1px solid black');
  //   expect(spinner).not.toBeInTheDocument();
  // });

  // test('renders error message', async () => {
  //   setup('/search/failing-request');
  //   await waitFor(
  //     () =>
  //       // eslint-disable-next-line implicit-arrow-linebreak
  //       expect(screen.getByText(/something went wrong/i)).toBeInTheDocument(),
  //     { timeout: 5000 },
  //   );
  // });
});

describe('heatmap', () => {
  test('loads and renders top posts for subreddit in URL', async () => {
    setup('/search/reactjs');

    const spinner = screen.getByTestId('spinner');

    await waitFor(
      () => expect(screen.getByTestId('heatmap')).toBeInTheDocument(),
      {
        timeout: 10000,
      },
    );

    // expect(await screen.findByTestId('heatmap')).toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();

    const heatmap = screen.getByTestId('heatmap');
    const cells = await within(heatmap).findAllByRole('button');
    expect(cells.length).toEqual(7 * 24);

    const numberOfPostsPerCell = cells.map((cell) => cell.innerHTML);
    expect(numberOfPostsPerCell).toMatchSnapshot();

    const timezone = screen.getByText('All times are shown in your timezone:');
    expect(within(timezone).getByText('Europe/Istanbul')).toBeInTheDocument();
  });

  test('cell highlights on click', async () => {
    setup('/search/reactjs');

    const heatmap = await screen.findByTestId('heatmap');
    const cells = await within(heatmap).findAllByRole('button');

    const cellToClick = cells[1];
    expect(cellToClick).toHaveStyle('border: none');

    userEvent.click(cellToClick);
    expect(cellToClick).toHaveStyle('border: 1px solid #1e2537');
  });

  test('renders error message', async () => {
    setup('/search/failing-request');

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
    expect(screen.queryByText('loading-spinner.svg')).not.toBeInTheDocument();
  });
});
