import { PostPage } from './posts/PostPage';
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { getPosts } from './posts/getPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: '/',
        element: <PostPage />,
        loader: async () => defer({ posts: getPosts() }),
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
