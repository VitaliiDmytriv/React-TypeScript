import { getPosts } from '../utils/getPosts';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { PostList } from '../Components/PostList';
import { useQuery } from '@tanstack/react-query';

function Home() {
    const { user, dispatch } = useUserContext();
    const { isLoading, data: posts } = useQuery(['posts'], getPosts);

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
                {isLoading || posts === undefined ? (
                    <div>Loading...</div>
                ) : (
                    <PostList posts={posts} />
                )}
            </section>
        </section>
    );
}

export default Home;
