import { authenticate } from './api/authenticate';
import { authorize } from './api/authorize';
import { useAppContext } from './AppContext';

export function Header() {
    const { dispatch, user, loading } = useAppContext();

    async function handleSignInClick() {
        dispatch({ type: 'authenticate' });
        const authenticateUser = await authenticate();
        dispatch({ type: 'authenticated', user: authenticateUser });
        if (authenticateUser) {
            dispatch({ type: 'authorize' });
            const authorizedPermissions = await authorize(authenticateUser.id);
            dispatch({
                type: 'authorized',
                permissions: authorizedPermissions,
            });
        }
    }

    return (
        <header className="flex justify-between items-center border-b-2 border-gray-100 py-6">
            {user ? (
                <span className="ml-auto font-bold">{user.name} has signed in</span>
            ) : (
                <button
                    onClick={handleSignInClick}
                    className="whitespace-nowrap inline-flex itemscenter justify-center ml-auto px-4 py-2 w-36 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? '...' : 'Sign in'}
                </button>
            )}
        </header>
    );
}
