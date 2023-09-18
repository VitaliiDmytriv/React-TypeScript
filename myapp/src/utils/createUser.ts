import { nanoid } from 'nanoid';
import { RegisterUser, User, PostData } from '../types';

export function createUser(registerUser: RegisterUser): User {
    const user: User = {
        id: nanoid(5),
        login: registerUser.login,
        email: registerUser.email,
        password: registerUser.password,
        posts: [] as PostData[],
    };

    return user;
}
