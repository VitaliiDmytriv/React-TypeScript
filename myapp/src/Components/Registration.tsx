import { useForm, FieldError } from 'react-hook-form';
import ValidationError from './ValidationError';
import spinner from '../assets/bars-rotate-fade.svg';
import { Cache, RegisterUser, Url } from '../types';
import { useRef } from 'react';
import { isLoginPass } from '../utils/isLoginPass';
import { isEmailPass } from '../utils/isEmailPass';
import { createUser } from '../utils/createUser';
import { cache } from '../cache';
import MyModal from './MyModal';

type Props = {
    handleClick: () => void;
};

export function Registration({ handleClick }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors, isSubmitSuccessful },
    } = useForm<RegisterUser>();

    const password = useRef({});
    password.current = watch('password', '');

    function getEditorStyle(fieldError: FieldError | undefined) {
        return fieldError ? 'border-red-500' : '';
    }

    async function onSubmit(registerUser: RegisterUser) {
        const user = createUser(registerUser);
        const response = await fetch(Url.users, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const body = await response.json();
        cache.delete(Cache.users);
        return body;
    }

    const fieldStyle = 'flex flex-col mb-2';
    return (
        <>
            {isSubmitSuccessful && (
                <MyModal>
                    <h4>You've succesfully created acount!</h4>
                    <div className="text-center">
                        <button className="underline" onClick={handleClick}>
                            Sign in
                        </button>
                    </div>
                </MyModal>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={fieldStyle}>
                    <label htmlFor="email">Email</label>
                    <input
                        className={`input ${getEditorStyle(errors.email)}`}
                        type="email"
                        {...register('email', {
                            required: 'You must enter email',
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            validate: async (value) => await isEmailPass(value),
                        })}
                    />
                    <ValidationError fieldError={errors.email} />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="login">Login</label>
                    <input
                        className={`input ${getEditorStyle(errors.login)}`}
                        type="text"
                        {...register('login', {
                            required: 'You must enter login',
                            validate: async (value) => await isLoginPass(value),
                        })}
                    />
                    <ValidationError fieldError={errors.login} />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={`input ${getEditorStyle(errors.password)}`}
                        type="password"
                        {...register('password', {
                            required: 'You must enter password',
                            minLength: {
                                value: 4,
                                message: 'Password should be at least 4 characters long',
                            },
                        })}
                    />
                    <ValidationError fieldError={errors.password} />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="password2">Confirm password</label>
                    <input
                        className={`input ${getEditorStyle(errors.password2)}`}
                        type="password"
                        {...register('password2', {
                            required: 'You must confirm password',
                            validate: (value) =>
                                value === password.current || 'The passwords do not match',
                        })}
                    />
                    <ValidationError fieldError={errors.password2} />
                </div>
                <div className="mt-4">
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
                            'Register'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
