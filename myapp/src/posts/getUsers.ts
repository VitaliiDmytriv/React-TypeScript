import { User, AuthorizeUser, isAuthUser } from '../types';

const usersUrl = 'http://localhost:3001/users/';

export async function getUsers() {
    const response = await fetch(usersUrl);
    const body = (await response.json()) as unknown;
    assertIsUsers(body);
    return body;
}

export function assertIsUsers(users: unknown): asserts users is User[] {
    if (!Array.isArray(users)) {
        throw new Error("users isn't array");
    }

    if (users.length === 0) {
        return;
    }

    users.forEach((user) => {
        if (!('password' in user)) {
            throw new Error("user doesn't contain password");
        }
        if (typeof user.password !== 'string') {
            throw new Error('password is not a string');
        }
        if (!('email' in user)) {
            throw new Error("user doesn't contain email");
        }
        if (typeof user.email !== 'string') {
            throw new Error('email is not a string');
        }
    });
}

export function isAuthorized(userAuth: AuthorizeUser, users: User[]): isAuthUser {
    let isEmail = false;
    let isPassword = false;
    let authorizedUser;
    users.forEach((user) => {
        if (user.email === userAuth.email) {
            isEmail = true;
            if (user.password === userAuth.password) {
                isPassword = true;
                authorizedUser = user as User;
            }
        }
    });

    if (!isEmail) {
        return 'Invalid email';
    }
    if (isEmail && !isPassword) {
        return 'Invalid password';
    }
    if (isEmail && isPassword) {
        return authorizedUser;
    }
}
