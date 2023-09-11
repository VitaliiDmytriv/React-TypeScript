import { User } from './AppContext';

export function authorizeFunc(user: User): Promise<User> {
    return new Promise((res) => {
        setTimeout(() => res(user), 10000);
    });
}
