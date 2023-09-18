import { getUsers } from './getUsers';

export async function isEmailPass(email: string) {
    const users = await getUsers();
    return users.every((user) => user.email !== email) || 'This email has already used';
}
