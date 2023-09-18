export type PostData = {
    id: number;
    title: string;
    description: string;
    author: string;
    date: number;
};

export type User = {
    id: string;
    login: string;
    email: string;
    password: string;
    posts: PostData[];
};

// export type AuthorizeUser = {
export type TryToAuthUser = {
    email: string;
    password: string;
};

export type isAuthUser = 'Invalid email' | 'Invalid password' | User;

export type RegisterUser = {
    email: string;
    login: string;
    password: string;
    password2: string;
};

export enum Cache {
    posts = 'posts',
    users = 'users',
}

export enum Url {
    users = 'http://localhost:3001/users/',
}
