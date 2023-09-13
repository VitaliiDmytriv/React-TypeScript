import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Authorize from './pages/Authorize';
import { UserProvider } from './UserContext';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/authorize',
        element: <Authorize />,
    },
]);

function Routes() {
    return (
        <div className="bg text-white bg-slate-400 min-h-screen px-12 py-5">
            <UserProvider>
                <RouterProvider router={routes} />
            </UserProvider>
        </div>
    );
}

export default Routes;
