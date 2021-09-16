import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import LibrasToggle from './LibrasToggle';

describe('Updates LIBRAS state' , () => {
  render(<LibrasToggle />);
  const toggleButton = screen.getByTestId("libras-toggle");
  
  test('should start with Libras', () => {
    expect(toggleButton).toHaveTextContent('Libras');
  })

  // test('should toggle content', () => {
  //   userEvent.click(toggleButton);
  //   expect(toggleButton).toHaveBeenCalled();
  // })
});