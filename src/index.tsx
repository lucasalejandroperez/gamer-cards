import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux"
import { GamerCardsApp } from './frontend/GamerCardsApp';
import { store } from './frontend/redux/store';
import './frontend/styles/general.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GamerCardsApp />
    </Provider>
  </React.StrictMode>
);
