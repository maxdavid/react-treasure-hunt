import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import * as reset from './styling/reset.css';
import * as global from './styling/global.css';

import { StateProvider } from './contexts/StateProvider';
import { initialState } from './reducers/initialState';
import { mainReducer } from './reducers/mainReducer';

import App from './App';

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${global}
`;

const theme = {}

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <StateProvider initialState={initialState} reducer={mainReducer}>
              <App />
        </StateProvider>
      </>
    </ThemeProvider>,
    document.getElementById('root')
  );
  
