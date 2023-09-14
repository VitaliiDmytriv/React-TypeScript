import { TryToAuthUser, isAuthUser, User } from '../types';

export function isAuthorized(userAuth: TryToAuthUser, users: User[]): isAuthUser {
    let isEmail = false;
    let isPassword = false;
    let authorizedUser: User | undefined;
    users.forEach((user) => {
        if (user.email === userAuth.email) {
            isEmail = true;
            if (user.password === userAuth.password) {
                isPassword = true;
                authorizedUser = user as User;
            }
        }
    });

    if (isEmail && isPassword && isUser(authorizedUser)) {
        return authorizedUser;
    }

    if (isEmail && !isPassword) {
        return 'Invalid password';
    }

    return 'Invalid email';
}

function isUser(user: User | undefined): user is User {
    return (user as User).email !== undefined;
}
