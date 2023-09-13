import { useForm } from 'react-hook-form';
import { AuthorizeUser } from '../types';
import { getUsers, isAuthorized } from '../posts/getUsers';
import spinner from '../bars-rotate-fade.svg';
import { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Authorize() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<AuthorizeUser>();
    const [showAuthError, setShowAuthError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useUserContext();
    const navigate = useNavigate();

    async function onSubmit(authUser: AuthorizeUser) {
        const users = await getUsers();
        const isAuth = isAuthorized(authUser, users);
        if (typeof isAuth === 'string') {
            setShowAuthError(true);
            setErrorMessage(isAuth);
        } else {
            setShowAuthError(false);
            dispatch({ type: 'authenticated', user: isAuth });
            navigate('/');
        }
    }
    const fieldStyle = 'flex flex-col mb-2';
    return (
        <section className="section p-4 rounded-lg shadow-md max-w-lg m-auto">
            <h1 className="text-center text-xl mb-2">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={fieldStyle}>
                    <label htmlFor="email">Email</label>
                    <input className="input" type="email" {...register('email')} />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="password">Password</label>
                    <input className="input" type="password" {...register('password')} />
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <button
                        disabled={isSubmitting}
                        className="input p-1 h-10 px-4 hover:shadow-lg transition-shadow"
                        type="submit"
                    >
                        {isSubmitting ? (
                            <div className="w-7 spinner ">
                                <img src={spinner} alt="" className="min-w-full" />
                            </div>
                        ) : (
                            'Log in'
                        )}
                    </button>
                    {showAuthError && (
                        <p className="text-red-500 font-bold bg-red-300 p-1">{errorMessage}</p>
                    )}
                </div>
            </form>
        </section>
    );
}

export default Authorize;
