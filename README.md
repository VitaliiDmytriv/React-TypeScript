So, GraphQL allows us to make a single web request for different bits of data, returning just the fields that we require. Doing a similar thing with a REST API would probably require multiple requests and we’d get a lot more data than we need to return. It is in these types of queries where GraphQL shines over REST.

.env.local is in the .gitignore file, so this file won’t get committed to source code
control, reducing the risk of your PAT getting stolen. Replace your-token with your PAT
token in the preceding code snippet.

GraphQL queries are specified in the request body in an object structure with a query property containing the GraphQL query string, which is GET_VIEWER_QUERY in our case. We have
also specified that the request is in JSON format using the Content-Type HTTP header.

```
export const GET_VIEWER_QUERY = `
    query{
        viewer{
            name
            avatarUrl
        }
    }
`;

export async function getViewer() {
    const response = await fetch(process.env.REACT_APP_GITHUB_URL!, {
        method: 'POST',
        body: JSON.stringify({
            query: GET_VIEWER_QUERY,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${process.env.REACT_APP_GITHUB_PAT}`,
        },
    });
}

```

The HTTP POST method must be used for GraphQL API requests
A PAT protects the GitHub GraphQL API

```
export function RepoPage() {
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
    const { data } = useQuery(
        ['repo', searchCriteria],
        () => getRepo(searchCriteria as SearchCriteria),
        {
            enabled: searchCriteria !== undefined,
        },
    );
}
```

enabled вкаже на те, щоб запит відбувся лише тоді коли буде searchCriteria
