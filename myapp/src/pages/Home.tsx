import { useState, useEffect } from 'react';
import { PostData } from '../types';
import { getPosts } from '../utils/getPosts';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { PostList } from '../Components/PostList';
import { useCurrentUrl } from '../hooks/useCurrentUrl';

function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, dispatch } = useUserContext();

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
