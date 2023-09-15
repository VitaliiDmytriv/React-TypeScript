import { useState, useEffect } from 'react';
import { PostData } from '../types';
import { getPosts } from '../utils/getPosts';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { PostList } from '../Components/PostList';
import { useCurrentUrl } from '../hooks/useCurrentUrl';
import { cache } from '../cache';

function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const { user, dispatch } = useUserContext();
    const currentUrl = useCurrentUrl();

    useEffect(() => {
        let cancel = false;

        if (cache.has(currentUrl)) {
            setPosts(cache.get(currentUrl));
        } else {
            getPosts().then((data) => {
                if (!cancel) {
                    setPosts(data);
                    cache.set(currentUrl, data);
                }
            });
        }

        return () => {
            cancel = true;
        };
    }, []);

    function handleExit() {
        localStorage.removeItem('currentUser');
        dispatch({ type: 'leave' });
    }

    return (
        <section className="section p-5 rounded-lg shadow-md">
            <header className=" border-b-2 pb-2 flex mb-5">
                <Link to={'/'}>Posts.com</Link>
                <span className="ml-auto">
                    {user ? (
                        <>
                            <Link to="/">{user.login}</Link>
                            <span onClick={handleExit} className="ml-3 cursor-pointer">
                                Exit
                            </span>
                        </>
                    ) : (
                        <Link to={'authorize'}>Sign in</Link>
                    )}
                </span>
            </header>
            <section>
                {posts.length !== 0 ? <PostList posts={posts} /> : <div>Loading...</div>}
            </section>
        </section>
    );
}

export default Home;
