import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

function setup() {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
}

describe('Hero', () => {
  test('Navigates to search page when the CTA buttton is clicked ', () => {
    setup();
    const ctaButton = screen.getByRole('link', {
      name: /show me the best time/i,
    });
    userEvent.click(ctaButton);
    expect(screen.getByText(/search page/i)).toBeInTheDocument();
  });

  test('Navigates to search page when the heatmap is clicked ', () => {
    setup();
    const heatmapImage = screen.getByAltText(/heatmap of reddit posts/i);
    userEvent.click(heatmapImage);
    expect(screen.getByText(/search page/i)).toBeInTheDocument();
  });
});

describe('Info Section', () => {
  test('Navigates to https://profy.dev when profy.dev link is clicked', () => {
    setup();

    /**
      There are two links with profy.dev on the page
      One in the footer and the other in the info section
      so you need to use getAll instead of get and pass the right index to get
      the desired text in this case it is 0
     */
    const link = screen.getAllByRole('link', { name: /profy.dev/i });
    expect(link[0].getAttribute('href')).toEqual('https://profy.dev');
  });

  test('Navigates to https://profy.dev/employers when more info link is clicked', () => {
    setup();
    const link = screen.getByRole('link', {
      name: /click here for more information/i,
    });
    expect(link.getAttribute('href')).toEqual('https://profy.dev/employers');
  });
});
