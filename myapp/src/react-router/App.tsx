import { PostPage } from './posts/PostPage';
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { getPosts } from './posts/getPosts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PostPage />,
        loader: async () => defer({ posts: getPosts() }),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
