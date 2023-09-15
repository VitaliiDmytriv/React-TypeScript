import { PostData } from '../types';
import { Post } from './Post';

type Porps = {
    posts: PostData[];
};

export function PostList({ posts }: Porps) {
    return (
        <div className="flex flex-col gap-3">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}
