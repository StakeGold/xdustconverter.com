import { gql } from '@apollo/client';

export const APP_STATE = gql`
  query appState {
    app {
      state
    }
  }
`;
