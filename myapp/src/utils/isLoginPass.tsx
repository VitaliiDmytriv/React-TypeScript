import { getUsers } from './getUsers';

export async function isLoginPass(login: string) {
    const users = await getUsers();
    return users.every((user) => user.login !== login) || 'This login has already used';
}
