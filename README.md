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

The callback Hook memoizes a function so that it isn’t recreated on each render. The Hook is called useCallback and the syntax is as follows:

```
const memoizedCallback = useCallback(() => someFunction(), []);
```

A function that executes the function to memoize is passed into useCallback as the first argument. The second argument passed to useCallback is an array of dependencies
When any dependencies change, the function in the first argument is executed again to return a new function to memoize. In the previous example, a new version of memoizedCallback is created every time a or b changes.

The type of the memoized function is inferred but can be explicitly defined in a generic parameter on useCallback

```
const memoizedValue = useCallback<() => void>(
    () => someFunction (),
    []
);
```

A common use case for useCallback is to prevent unnecessary re-renders of child components.

```
export function SomeComponent() {
    const [someState, setSomeState] = useState("something");
    return (
        <div>
            <ChildComponent />
            <AnotherChildComponent something={someState} />
            <button onClick={() => setSomeState("Something else")}></button>
        </div>
    );
}
```

When `someState` changes, `SomeComponent` will re-render – for example, when the button is clicked. In addition, `ChildComponent` and `AnotherChildComponent` will re-render when `someState` changes. This is because a component is re-rendered when its parent is re-rendered.

Може здатися, що цей повторний рендеринг може викликати проблеми з продуктивністю. Однак це рідко викликає проблеми з продуктивністю. Це тому, що оновлення DOM відбудеться лише після повторного рендерингу, якщо зміниться віртуальний DOM, а віртуальний DOM змінюється якщо він бачить якісь зміни відносно попереднього рендеру.
Якщо визначення ChildComponent виглядає так:

```
export function ChildComponent() {
    return <span>A child component</span>;
}
```

DOM для ChildComponent не буде оновлено під час повторного рендерингу, оскільки віртуальний DOM залишиться незмінним.

While this re-rendering behavior generally doesn’t cause performance problems, it can cause performance issues if a computationally expensive component is frequently re-rendered or a component with a slow side effect is frequently re-rendered. For example, we would want to avoid unnecessary re-renders in components with a side effect that fetches data.

There is a function called memo in React that can be used to prevent unnecessary re-renders. The memo function can be applied as follows to ChildComponent to prevent unnecessary re-renders:

```
export const ChildComponent = memo(() => {
    return <span>A child component</span>;
});
```

Можна подивитись які елементи ререндеряться, глянувши Elements в DevTools, можна побачити що елементи "ререндеряться" але в DOM оновлюються лише ті в яких змінились значення.

Even though Reset is unnecessarily re-rendered, it doesn’t result in a DOM update. In addition,
Reset isn’t computationally expensive and doesn’t contain any side effects.

### Recap

`useRef` is a React Hook that lets you reference a value that’s not needed for rendering.

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.

`memo` lets you skip re-rendering a component when its props are unchanged.

`useCallback` is a React Hook that lets you cache a function definition between re-renders.

`useReducer` is an alternative to useState for using state, and we experienced using both approaches in our PersonScore example component. useState is excellent for primitive state values. useReducer is great for complex object state values, particularly when state changes depend on previous state values.

-   A component is re-rendered when its parent is re-rendered.
-   React’s memo function can be used to prevent unnecessary re-renders to child components.
-   useCallback can be used to memoize functions. This can be used to create a stable reference for function props passed to child components to prevent unnecessary re-renders.
-   React’s memo function and useCallback should be used wisely – make sure they help performance before using them because they increase the complexity of the code.

1. Conditional rendering
2. Не може async функція бути першим аргументом useEffec, повина бути звичайна функція всередині якої може бути async func.
3. 1 / 1
4. 0/0
5. steps
6. 0 - томущо виводиться закешоване значення, яке не оновлюється через пустий депенденсі масив.
7. 1
