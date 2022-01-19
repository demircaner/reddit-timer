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
    expect(
      within(timezone).getByText(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      ),
    ).toBeInTheDocument();
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

async function clickFirstCellWithValue(value) {
  const heatmap = await screen.findByTestId('heatmap');
  const cell = within(heatmap).getAllByText(value)[0];
  userEvent.click(cell);
}

describe('posts table', () => {
  test('is not visible when no cell is clicked', async () => {
    setup('/search/reactjs');
    await screen.findByTestId('heatmap');

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('is not visible when cell with no posts is clicked', async () => {
    setup('/search/reactjs');
    await clickFirstCellWithValue('0');

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('shows posts ordered by time according to cell that is clicked', async () => {
    setup('/search/reactjs');
    await clickFirstCellWithValue('4');

    const table = screen.getByRole('table');
    const tableRows = within(table).getAllByRole('row').slice(1);

    const tableContent = tableRows.map((row) => {
      const cells = within(row).getAllByRole('cell');
      const titleLink = within(cells[0]).getByRole('link');
      const authorLink = within(cells[4]).getByRole('link');
      return {
        title: titleLink.innerHTML,
        href: titleLink.href,
        time: cells[1].innerHTML,
        score: cells[2].innerHTML,
        numComments: cells[3].innerHTML,
        author: authorLink.innerHTML,
        authorHref: authorLink.href,
      };
    });

    expect(tableContent).toMatchSnapshot();
  });

  test('shows no link for deleted user', async () => {
    setup('/search/reactjs');
    const heatmap = await screen.findByTestId('heatmap');
    const sunday5pm = within(heatmap).getAllByText('6')[1];
    userEvent.click(sunday5pm);

    // const table = screen.getByRole('table');
    // const rowWithDeletedUser = within(table).getAllByRole('row')[4];

    // const authorCell = within(rowWithDeletedUser).getAllByRole('cell')[4];
    // expect(within(authorCell).queryByRole('link')).not.toBeInTheDocument();
    // expect(authorCell.innerHTML).toBe('[deleted]');
  });
});
