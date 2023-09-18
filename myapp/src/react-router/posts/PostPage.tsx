import { PostData, NewPostData } from './types';
import { PostList } from './PostList';
import { NewPostForm } from './NewPostForm';
import { savePost } from './savePost';
import { assertIsPosts } from './getPosts';
import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

type Data = {
    posts: PostData[];
};
export function assertIsData(data: unknown): asserts data is Data {
    if (typeof data !== 'object') {
        throw new Error("Data isn't an object");
    }
    if (data === null) {
        throw new Error('Data is null');
    }
    if (!('posts' in data)) {
        throw new Error("data doesn't contain posts");
    }
}

export function PostPage() {
    const data = useLoaderData();
    assertIsData(data);

    async function handleSave(newPostData: NewPostData) {
        await savePost(newPostData);
    }

    return (
        <div className="w-96 mx-auto mt-6">
            <h2 className="text-xl text-slate-900 fontbold">Posts</h2>
            <NewPostForm onSave={handleSave} />
            <Suspense fallback={<div>Fetching ...</div>}>
                <Await resolve={data.posts}>
                    {(posts) => {
                        assertIsPosts(posts);
                        return <PostList posts={posts} />;
                    }}
                </Await>
            </Suspense>
        </div>
    );
}
