import { cache } from '../cache';
import { Cache, User } from '../types';

const usersUrl = 'http://localhost:3001/users/';

export async function getUsers() {
    if (cache.has(Cache.users)) {
        return new Promise<User[]>((resolve) => {
            // setTimeout(() => resolve(cache.get(Cache.users)), 300);
            resolve(cache.get(Cache.users));
        });
    }
    const response = await fetch(usersUrl);
    const body = (await response.json()) as unknown;
    assertIsUsers(body);
    cache.set(Cache.users, body);
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
