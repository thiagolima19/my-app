import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group number', () => {
  render(<App />);
  const groupElement = screen.getByText(/Group 3/i);
  expect(groupElement).toBeInTheDocument();
});

test('renders all team members names', () => {
  render(<App />);
  expect(screen.getByText(/Thiago Barbosa Lima/i)).toBeInTheDocument();
  expect(screen.getByText(/Marianna Rangel Antunes/i)).toBeInTheDocument();
  expect(screen.getByText(/Gunther Dos Santos/i)).toBeInTheDocument();
  expect(screen.getByText(/Daniela Souza Freire/i)).toBeInTheDocument();
  expect(screen.getByText(/Bruno Alves Martins/i)).toBeInTheDocument();
});

test('renders Team Members heading', () => {
  render(<App />);
  expect(screen.getByText(/Team Members/i)).toBeInTheDocument();
});
