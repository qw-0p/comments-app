
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './styles/index.scss'
import { Provider } from 'react-redux';
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App data-test="app" />
    </PersistGate>
  </Provider>
);
