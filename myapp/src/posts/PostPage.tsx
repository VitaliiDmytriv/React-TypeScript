import { useEffect, useState } from 'react';
import { getPosts } from './getPosts';
import { PostData, NewPostData } from './types';
import { PostList } from './PostList';
import { NewPostForm } from './NewPostForm';
import { savePost } from './savePost';

export function PostPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        let cancel = false;
        getPosts().then((data) => {
            if (!cancel) {
                setPosts(data);
                setIsLoading(false);
            }
        });
        return () => {
            cancel = true;
        };
    }, []);

    async function handleSave(newPostData: NewPostData) {
        const newPost = await savePost(newPostData);
        setPosts([newPost, ...posts]);
    }

    if (isLoading) {
        return <div className="w-96 mx-auto mt-6">Loading ...</div>;
    }

    return (
        <div className="w-96 mx-auto mt-6">
            <h2 className="text-xl text-slate-900 fontbold">Posts</h2>
            <NewPostForm onSave={handleSave} />
            <PostList posts={posts} />
        </div>
    );
}
