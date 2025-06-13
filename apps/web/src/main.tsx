import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import { store } from '@/stores';

import '@ttrak/ui/globals.css';
import '@/modules/task/styles/index.css';
import { Toaster } from '@ttrak/ui/components/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster className='toaster' />
    </Provider>
  </StrictMode>
);
