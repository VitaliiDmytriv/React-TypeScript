import { ReactNode, createContext, useContext, useReducer } from 'react';
import { User } from './types';
import { useCurrentUrl } from './hooks/useCurrentUrl';

type Props = {
    children: ReactNode;
};

type State = {
    user: User | null;
};

type Action =
    | {
          type: 'authenticated';
          user: User | null;
      }
    | {
          type: 'leave';
      };

type UserContextType = State & {
    dispatch: React.Dispatch<Action>;
};

const currentUser = localStorage.getItem('currentUser');

const initialState: State = {
    user: currentUser ? JSON.parse(currentUser) : null,
};

const userContext = createContext<UserContextType>({
    ...initialState,
    dispatch: () => {},
});

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'authenticated':
            return { user: action.user };
        case 'leave':
            return { user: null };
        default:
            return state;
    }
}

export function UserProvider({ children }: Props) {
    const url = useCurrentUrl();
    console.log(url);

    const [{ user }, dispatch] = useReducer(reducer, initialState);

    return <userContext.Provider value={{ user, dispatch }}>{children}</userContext.Provider>;
}

export const useUserContext = () => useContext(userContext);
