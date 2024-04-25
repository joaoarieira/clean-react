import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from '@/presentation/components/app-routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
