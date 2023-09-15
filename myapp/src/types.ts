export type PostData = {
    id: number;
    title: string;
    description: string;
    author: string;
    date: number;
};

export type User = {
    id: number;
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
