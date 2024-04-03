import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './redux/store.ts';
import './index.css';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          duration={2000}
          toastOptions={{
            style: {
              background: 'rgba(22, 72, 99, 0.7)',
              color: '#fff',
              fontWeight: 900,
              padding: '1rem',
            },
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
