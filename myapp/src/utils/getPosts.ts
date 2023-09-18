import { cache } from '../cache';
import { PostData } from '../types';
import { Cache } from '../types';

const postsUrl = 'http://localhost:3001/posts/';

export async function getPosts() {
    if (cache.has(Cache.posts)) {
        return new Promise<PostData[]>((resolve) => {
            resolve(cache.get(Cache.posts));
        });
    }

    const response = await fetch(postsUrl);
    const body = (await response.json()) as unknown;
    assertIsPosts(body);
    cache.set(Cache.posts, body);
    return body;
}

export function assertIsPosts(postsData: unknown): asserts postsData is PostData[] {
    if (!Array.isArray(postsData)) {
        throw new Error("posts isn't array");
    }

    if (postsData.length === 0) {
        return;
    }

    postsData.forEach((post) => {
        if (!('id' in post)) {
            throw new Error("post doesn't contain id");
        }
        if (typeof post.id !== 'string') {
            throw new Error('id is not a string');
        }
        if (!('title' in post)) {
            throw new Error("post doesn't contain title");
        }
        if (typeof post.title !== 'string') {
            throw new Error('id is not a string');
        }
        if (!('description' in post)) {
            throw new Error("post doesn't contain description");
        }
        if (typeof post.description !== 'string') {
            throw new Error('description is not a string');
        }
    });
}
