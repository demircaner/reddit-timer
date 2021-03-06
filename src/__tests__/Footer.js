import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function setup(initialPath = '/') {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Footer', () => {
  test('navigates to profiy.dev/employers when profy.dev link is clicked', () => {
    setup();
    const footer = screen.getByRole('contentinfo');
    const link = within(footer).getByRole('link', { name: /profy.dev/i });
    expect(link.getAttribute('href')).toEqual('https://profy.dev/employers');
  });

  test('navigates to homepage when the logo is clicked', () => {
    setup('/search/javascript');
    const logoLink = screen.getByRole('link', { name: /sign.svg/i });
    userEvent.click(logoLink);
    const text = screen.getByText(/No reactions to your reddit posts/i);
    expect(text).toBeInTheDocument();
  });

  test('navigates to homepage when the logo is clicked', () => {
    setup('/search/javascript');
    const termsLink = screen.getByRole('link', { name: /terms & privacy/i });
    userEvent.click(termsLink);
    const text = screen.getByText(/terms page/i);
    expect(text).toBeInTheDocument();
  });
});
