import React from 'react';
import ReactDOM from 'react-dom/client';

import { router } from './routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
