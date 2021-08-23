import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Updates LIBRAS state' , () => {
  render(<Menu text={"Test"} />);
  const toggleButton = screen.getByTestId("libras-toggle");
  
  test('should start with Libras', () => {
    expect(toggleButton.textContent === "Libras").toBe(true);
  })

  test('should toggle content', () => {
    expect(toggleButton.textContent === "Libras").toBe(true);
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("libras-toggle").textContent === "Texto").toBe(true);
  })
});