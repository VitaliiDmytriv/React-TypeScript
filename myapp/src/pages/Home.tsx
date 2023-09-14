import { useState, useEffect } from 'react';
import { PostData } from '../types';
import { getPosts } from '../utils/getPosts';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUserContext();

    // console.log(user);

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

    return (
        <section className="section p-4 rounded-lg shadow-md">
            <header className=" border-b-2 pb-2 flex">
                <Link to={'/'}>Posts.com</Link>
                <span className="ml-auto">
                    {user ? (
                        <>
                            <Link to="/">{user.login}</Link>
                            <span>Exit</span>
                        </>
                    ) : (
                        <Link to={'authorize'}>Sign in</Link>
                    )}
                </span>
            </header>
            <div>Home page</div>
        </section>
    );
}

export default Home;
