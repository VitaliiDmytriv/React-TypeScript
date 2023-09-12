### Prop-drilling

The key point in this section is that it is fine to share state across a few adjacent components using props but isn’t ideal for sharing across lots of components far apart in the component tree.

### React context

In comparison to prop drilling, React context requires more code to be written. However, it allows components to access shared state using a hook rather than passing it through components using props. It’s an elegant, shared-state solution, particularly when many components share state.

### React redux

https://redux-toolkit.js.org/tutorials/quick-start

In Redux, the state lives in a centralized immutable object referred to as a store. There is only a single store for the whole app. Like useReducer, the state in a store is updated by dispatching an action, which is an object containing the type of change and any data required to make the change. An action is handled by a reducer function, which creates a new version of the state.

-   State is stored in a central store
-   State is updated by dispatching actions that are handled by reducers
-   A Provider component needs to be placed appropriately in the component tree to give
    components access to the Redux store
-   Components can select state using a useSelector hook and dispatch actions using a
    useDispatch hook.

As you have experienced, even using the Redux Toolkit requires many steps when using Redux to manage state. It is overkill for simple state management requirements but shines when there is a lot of shared application-level state.

### Summary

In this chapter, we built a small one-page app that contained components that needed to share state. We started by using our existing knowledge and used props to pass the state between the components. We learned that a problem with this approach was that components not needing access to the state are forced to access it if its child components do need access to it.

We moved on to learn about React context and refactored the app to use it. We learned that React context can store state using useState or useReducer. The state can then be provided to components in the tree using the context’s Provider component. Components then access the context state via the useContext hook. We found that this was a much nicer solution than passing the state via props, particularly when many components need access to the state.

Next, we learned about Redux, which is similar to React context. A difference is that there can only be a single Redux store containing the state, but there can be many React contexts. We learned that a Provider component needs to be added to the component tree to give components access to the Redux store. Components select state using the useSelector hook and dispatch actions using the useDispatch hook. Reducers handle actions and then update the state accordingly.

1. We didn't set the default value
2. We didn't provide the value props on <Provide> component
3. Yes, you can have as many contexts as you want,
4. No, there is only one store in redux
5. You can't use useDispatch to change value, first you need to call it ` const dispatch = useDispatch()` And only after that, it can be used to change data.
6. Yes ?
7. Beacuse redux uses immer, it means that data can be mutated like in vanila
