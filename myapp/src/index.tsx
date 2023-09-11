import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Authorize, { action as authorizeAction } from './Authorize';
import { AppProvider } from './AppContext';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Main';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'authorize',
                element: <Authorize />,
                action: authorizeAction,
            },
            {
                path: 'main',
                element: <Main />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={routes} />
        </AppProvider>
    </React.StrictMode>,
);
