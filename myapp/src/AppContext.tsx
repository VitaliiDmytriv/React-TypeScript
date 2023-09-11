import { createContext, ReactNode, useContext, useReducer } from 'react';
export type User = {
    name: string;
    email: string;
};

type State = {
    user: undefined | User;
    loading: boolean;
};

type Action =
    | {
          type: 'authenticate';
      }
    | {
          type: 'authenticated';
          user: User | undefined;
      };

type Props = {
    children: ReactNode;
};

type AppContext = State & {
    dispatch: React.Dispatch<Action>;
};

const initialState: State = {
    user: undefined,
    loading: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'authenticate':
            return { ...state, loading: true };
        case 'authenticated':
            return { ...state, loading: false, user: action.user };
        default:
            return state;
    }
}

export const SomeContext = createContext<AppContext>({ ...initialState, dispatch: () => {} });

export function AppProvider({ children }: Props) {
    const [{ loading, user }, dispatch] = useReducer(reducer, initialState);

    return (
        <SomeContext.Provider value={{ dispatch, loading, user }}>{children}</SomeContext.Provider>
    );
}

export function useSomeContext() {
    return useContext(SomeContext);
}
