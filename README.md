### Creating a REST API

We will create a REST API using a tool called JSON Server, which allows a REST API to be quickly created. Install JSON Server by running the following command:

```
npm i -D json-server
```

We then define the data behind the API in a JSON file. Create a file called db.json in the root of the project containing the following:

```

{
    "posts": [
        {
            "title": "Getting started with fetch",
            "description": "How to interact with backend APIs using fetch",
            "id": 1
        },
        {
            "title": "Getting started with useEffect",
            "description": "How to use React's useEffect hook for interacting with backend APIs",
            "id": 2
        }
    ]
}

```

Now we need to define an npm script to start the JSON server and handle requests. Open package.json and add a script called server as follows:

```
"scripts": {
        ...,
        "server": "json-server --watch db.json --port 3001 --delay 2000"
    },
```

The script starts the JSON server and watches the JSON file we just created. We have specified that the API runs on port 3001 so that it doesn’t clash with the app running on port 3000. We have also slowed down the API responses by adding a 2-second delay, which will help us see when data is being fetched from the React app.

In a terminal, start the API by running the script we just created, as follows:

```
npm run server
```

We will now quickly recap what we have learned with React Router’s data-fetching capabilities:

-   React Router’s loader allows us to efficiently load fetched data into a route component
-   React Router’s defer allows the route component not to be blocked from rendering the
    component while data is being fetched
-   React Router’s useLoaderData hook allows a component to access a route’s loader data
-   React’s Suspense and React Router’s Await allow a component to render while data is still
    being fetched
