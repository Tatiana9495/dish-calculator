import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root)
});
