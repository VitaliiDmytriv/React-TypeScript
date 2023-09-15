import { PostData } from '../types';

type Props = {
    post: PostData;
};

export function Post({ post }: Props) {
    return (
        <article className="border-2 border-transparent post rounded-xl p-3 cursor-pointer hover:shadow-lg hover:border-white transition-all">
            <h3 className="font-bold pb-2 ">{post.title}</h3>
            <p>{post.description}</p>
        </article>
    );
}
