import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster />
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
);
