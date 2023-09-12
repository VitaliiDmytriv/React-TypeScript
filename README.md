### Prop-drilling

The key point in this section is that it is fine to share state across a few adjacent components using props but isn’t ideal for sharing across lots of components far apart in the component tree.

### React context

In comparison to prop drilling, React context requires more code to be written. However, it allows components to access shared state using a hook rather than passing it through components using props. It’s an elegant, shared-state solution, particularly when many components share state.

### React redux

In Redux, the state lives in a centralized immutable object referred to as a store. There is only a single store for the whole app. Like useReducer, the state in a store is updated by dispatching an action, which is an object containing the type of change and any data required to make the change. An action is handled by a reducer function, which creates a new version of the state.
