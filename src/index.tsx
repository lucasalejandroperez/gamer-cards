import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux"
import { GamerCardsApp } from './frontend/GamerCardsApp';
import { store } from './frontend/redux/store';
import './frontend/styles/general.css';
import { createGlobalStyle } from 'styled-components';
import { mainTheme } from './frontend/styles/mainColors';

const container = document.getElementById('root')!;
const root = createRoot(container);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background:linear-gradient(
        ${mainTheme.primaryColor}, 
        ${mainTheme.secondaryColor});
    color: ${mainTheme.lightColor};
    overflow-x: hidden;
  }

  h1,h2,h3 {
    font-family: 'Montserrat', sans-serif;
  }

  span {
    font-family: 'Open Sans', sans-serif;
  }

  a {
    font-family: 'Montserrat', sans-serif;
  }
`;

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle />
        <GamerCardsApp />
    </Provider>
  </React.StrictMode>
);
