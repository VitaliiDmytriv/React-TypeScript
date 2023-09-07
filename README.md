### React Router

-   In a web app, routes in React Router are defined using createBrowserRouter
-   Each route has a path and a component to render when the browser’s URL matches that path
-   The router returned from createBrowserRouter is passed into a RouterProvider
    component, which should be placed high up in the component tree

### Route Parameter

-   A route parameter is a varying segment in a path defined using a colon followed by the parameter name
-   Route parameters can be accessed using React Router’s useParams hook
