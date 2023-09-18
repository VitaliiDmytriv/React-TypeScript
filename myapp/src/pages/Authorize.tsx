import { Registration } from '../Components/Registration';
import { SignIn } from '../Components/SignIn';
import { useState } from 'react';

function Authorize() {
    const [isRegister, setIsRegister] = useState(false);

    function handleRegister() {
        setIsRegister(true);
    }
    function handleLogIn() {
        setIsRegister(false);
    }
    return (
        <section className="section p-4 rounded-lg shadow-md max-w-lg m-auto">
            <h1 className="text-center text-xl mb-2">{isRegister ? 'Registarion' : 'Sign In'}</h1>
            {isRegister ? <Registration handleClick={handleLogIn} /> : <SignIn />}

            {isRegister ? (
                <p className="mt-3 text-xs">
                    Already have an acount?{' '}
                    <button onClick={handleLogIn} className="hover:underline">
                        Log in
                    </button>
                </p>
            ) : (
                <p className="mt-3 text-xs">
                    Don't have an acount?{' '}
                    <button onClick={handleRegister} className="hover:underline">
                        Register now
                    </button>
                </p>
            )}
        </section>
    );
}

export default Authorize;
