## Using Hooks

### useState

```
const [state, setState] = useState(initialState);
```

```
const [name, setName] = useState<string | undefined>();
```

```
setTate(previousState => previousState + 1)
```

### useReducer

Here is an example of a useReducer call:

```
const [state, dispatch] = useReducer(reducer, initialState);
```

The dispatch function takes in an argument that describes the change. This object is called an action.

```
dispatch({ type: 'add', amount: 2 });
```

The types for useReducer can be explicitly defined in its generic parameter as follows:

```
const [state, dispatch] = useReducer<Reducer<State, Action>>( reducer, initialState );
```

```
type State = {
    name: string | undefined;
    score: number;
    loading: boolean;
};

type Action =
    | {
          type: "initialize";
          name: string;
      }
    | {
          type: "increment";
      }
    | {
          type: "decrement";
      }
    | {
          type: "reset";
      };


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "initialize":
            return { name: action.name, score: 0, loading: false };
        case "increment":
            return { ...state, score: state.score + 1 };
        case "decrement":
            return { ...state, score: state.score - 1 };
        case "reset":
            return { ...state, score: 0 };
        default:
            return state;
    }
}

const [{ name, score, loading }, dispatch] = useReducer(reducer, {
        name: undefined,
        score: 0,
        loading: true,
    });

useEffect(() => {
    getPerson().then(({ name }) => {
        dispatch({ type: "initialize", name });
    });
}, []);

```

### ref Hook

An initial value can optionally be passed into useRef. The type of the ref can be explicitly defined in a generic argument for useRef:

```
const ref = useRef<Ref>(initialValue);
```

The generic argument is useful when no initial value is passed or is null

A common use of the useRef Hook is to access HTML elements imperatively. HTML elements have a ref attribute in JSX that can be assigned to a ref.

```
function MyComponent() {
    const inputRef = useRef<HTMLInputElement>(null);
    function doSomething() {
        console.log(
            "All the properties and methods of the input",
            inputRef.current
        );
    }
    return <input ref={inputRef} type="text" />;
}
```

The ref used here is called inputRef and is initially null. So, it is explicitly given a type of HTMLInputElement, which is a standard type for input elements

```
const addButtonRef = useRef<HTMLButtonElement>(null);
```

To recap, the useRef Hook creates a mutatable value and doesn’t cause a re-render when changed. It is commonly used to access HTML elements in React imperatively.

### useMemo

The memo Hook creates a memoized value and is beneficial for values that have computationally expensive calculations.

```
const memoizedValue = useMemo(() => expensiveCalculation(),[]);

```

The second argument passed to useMemo is an array of dependencies. So, if the
expensiveCalculation function has dependencies a and b, the call will be as follows:

```
const memoizedValue = useMemo(
    () => expensiveCalculation(a, b),
    [a, b]
);
```

When any dependencies change, the function in the first argument is executed again to return a new value to memoize. In the previous example, a new version of memoizedValue is created every time a or b changes.

The type of the memoized value is inferred but can be explicitly defined in a generic parameter on useMemo

```
const memoizedValue = useMemo<number>(
    () => expensiveCalculation(),
    []
);
```

```
const expensiveCalculation = sillyExpensiveFunction();

return (
    ...
    <p>{expensiveCalculation}</p>
    ...
)
```

Refresh the browser containing the app and click the buttons. If you look in the console, you will see that the expensive function is executed every time the component is re-rendered after a button click.

```
const expensiveCalculation = useMemo(() => sillyExpensiveFunction(), []);
```

The useMemo Hook is used to memoize the value from the function call.
Refresh the browser containing the running app and click the buttons. If you look in the console, you will see that the expensive function isn’t executed when the buttons are clicked because the memoized value is used instead.

### Callback Hook
