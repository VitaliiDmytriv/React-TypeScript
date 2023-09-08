import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThankYouPage } from './ThankYouPage';
import { ContactPage, contactPageAction } from './ContactPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="contact" />,
    },
    {
        path: 'contact',
        element: <ContactPage />,
        action: contactPageAction,
    },
    {
        path: 'thank-you/:name',
        element: <ThankYouPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
