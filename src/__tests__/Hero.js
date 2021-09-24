import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import userEvent from '@testing-library/user-event';

function setup() {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
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
