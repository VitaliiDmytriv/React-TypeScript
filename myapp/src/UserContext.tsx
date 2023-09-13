import { ReactNode, createContext, useContext, useReducer } from 'react';
import { User } from './types';

type Props = {
    children: ReactNode;
};

type State = {
    user: User | undefined;
};

type Action =
    | {
          type: 'authenticated';
          user: User | undefined;
      }
    | {
          type: 'leave';
      };

type UserContextType = State & {
    dispatch: React.Dispatch<Action>;
};

const initialState: State = {
    user: undefined,
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
            return { user: undefined };
        default:
            return state;
    }
}

export function UserProvider({ children }: Props) {
    const [{ user }, dispatch] = useReducer(reducer, initialState);

    return <userContext.Provider value={{ user, dispatch }}>{children}</userContext.Provider>;
}

export const useUserContext = () => useContext(userContext);
