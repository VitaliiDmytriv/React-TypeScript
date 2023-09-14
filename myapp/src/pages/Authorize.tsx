import { useForm, FieldError } from 'react-hook-form';
import { TryToAuthUser } from '../types';
import { getUsers } from '../utils/getUsers';
import spinner from '../bars-rotate-fade.svg';
import { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { isAuthorized } from '../utils/isAuthorized';
import ValidationError from '../Components/ValidationError';

function Authorize() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<TryToAuthUser>();

    const [showAuthError, setShowAuthError] = useState(false);
    const [AuthErrorMessage, setAuthErrorMessage] = useState('');
    const { dispatch } = useUserContext();
    const navigate = useNavigate();

    async function onSubmit(tryToAuthUser: TryToAuthUser) {
        const users = await getUsers();
        const isAuth = isAuthorized(tryToAuthUser, users);
        if (typeof isAuth === 'string') {
            setShowAuthError(true);
            setAuthErrorMessage(isAuth);
        } else {
            setShowAuthError(false);
            dispatch({ type: 'authenticated', user: isAuth });
            navigate('/');
        }
    }
    const fieldStyle = 'flex flex-col mb-2';
    function getEditorStyle(fieldError: FieldError | undefined) {
        return fieldError ? 'border-red-500' : '';
    }
    return (
        <section className="section p-4 rounded-lg shadow-md max-w-lg m-auto">
            <h1 className="text-center text-xl mb-2">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={fieldStyle}>
                    <label htmlFor="email">Email</label>
                    <input
                        className={`input ${getEditorStyle(errors.email)}`}
                        type="email"
                        {...register('email', {
                            required: 'You must enter email',
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        })}
                    />
                    <ValidationError fieldError={errors.email} />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={`input ${getEditorStyle(errors.password)}`}
                        type="password"
                        {...register('password', {
                            required: 'You must enter password',
                        })}
                    />
                    <ValidationError fieldError={errors.password} />
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
                        <p className="text-red-500 font-bold bg-red-300 p-1">{AuthErrorMessage}</p>
                    )}
                </div>
            </form>
        </section>
    );
}

export default Authorize;
