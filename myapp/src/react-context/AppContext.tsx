import { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from './api/authenticate';

type State = {
    user: undefined | User;
    permissions: undefined | string[];
    loading: boolean;
};

const initialState: State = {
    user: undefined,
    permissions: undefined,
    loading: false,
};

type Action =
    | {
          type: 'authenticate';
      }
    | {
          type: 'authenticated';
          user: User | undefined;
      }
    | {
          type: 'authorize';
      }
    | {
          type: 'authorized';
          permissions: string[];
      };

type AppContextType = State & {
    dispatch: React.Dispatch<Action>;
};

type Props = {
    children: ReactNode;
};

const AppContext = createContext<AppContextType>({
    ...initialState,
    dispatch: () => {},
});

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'authenticate':
            return { ...state, loading: true };
        case 'authenticated':
            return { ...state, loading: false, user: action.user };
        case 'authorize':
            return { ...state, loading: true };
        case 'authorized':
            return { ...state, loading: false, permissions: action.permissions };
        default:
            return state;
    }
}

export function AppProvider({ children }: Props) {
    const [{ loading, permissions, user }, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider
            value={{
                user,
                dispatch,
                loading,
                permissions,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
