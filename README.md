### React Router

-   In a web app, routes in React Router are defined using createBrowserRouter
-   Each route has a path and a component to render when the browser’s URL matches that path
-   The router returned from createBrowserRouter is passed into a RouterProvider
    component, which should be placed high up in the component tree

### Route Parameter

-   A route parameter is a varying segment in a path defined using a colon followed by the parameter name
-   Route parameters can be accessed using React Router’s useParams hook

Type predicates in TypeScript are functions that return a boolean value and are used to narrow down the type of a variable. They are primarily used in conditional blocks to check whether a variable is of a particular type and then perform specific operations accordingly.

```
const error = useRouteError();

function isError(error: any): error is { statusText: string } {
    return 'statusText' in error;
}
```

The function checks whether the error object has a statusText property and if so, gives it a type with this property.

### index routes

An index route can be thought of as a default child route. In React Router, if no children match a parent route, it will display an index route if one is defined. An index route has no path and instead has an index Boolean property, as in the following example:

```
{
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        ...,
    ]
}
```

### search parameters

Search parameters are part of a URL that comes after the ? character and separated by the & character. Search parameters are sometimes referred to as query parameters. In the following URL, `type` and `when` are search parameters: https://somewhere.com/?type=sometype&when=recent.

React Router has a hook that returns functions for getting and setting search parameters called useSearchParams:

```
const [searchParams, setSearchParams] = useSearchParams();
```

searchParams is a JavaScript URLSearchParams object. There is a get method on URLSearchParams, which can be used to get the value of a search parameter.
The following example gets the value of a search parameter called type:

```
const type = searchParams.get('type');
```

The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

Ця функція не перезагружає сторінку, записує в searchParams нове значення і відповідно в url це значення оновлюється коли виконується сабміт.

```
import { FormEvent } from 'react';

...
function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        setSearchParams({ search });
    }
```

The submit handler parameter is typed using FormEvent. FormEvent is a generic type that takes in the type of the element, which is HTMLFormElement for a form submit handler.

We use the JavaScript FormData interface to get the value of the search field. Then, we use a type assertion to set the type of the search field value to a string.

The last line of code in the submit handler sets the value of the search parameter. This will update the browser’s URL to have this search parameter.
