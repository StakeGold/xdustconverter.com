import './index.css';
import './assets/sass/theme.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
