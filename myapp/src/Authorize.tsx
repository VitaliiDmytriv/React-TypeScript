import { useSomeContext, User } from './AppContext';
import { Form, ActionFunctionArgs, useActionData, useNavigate } from 'react-router-dom';
import { authorizeFunc } from './authorizeFunc';
import { useEffect } from 'react';
import spinner from './spinner.svg.png';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
    } as User;
    return user;
}

function Authorize() {
    const { dispatch, loading } = useSomeContext();
    const data = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleSignIn() {
            if (data) {
                dispatch({ type: 'authenticate' });
                const user = await authorizeFunc(data as User);
                dispatch({ type: 'authenticated', user: user });
                navigate('/main');
            }
        }
        handleSignIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const fieldStyle = 'flex flex-col mb-2';
    return (
        <section className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-center text-lg">Sign in</h1>
            <Form method="post">
                <div className={fieldStyle}>
                    <label htmlFor="">Your name</label>
                    <input name="name" className="w-full py-1 px-2 outline-none" type="text" />
                </div>
                <div className={fieldStyle}>
                    <label htmlFor="email">Your email address</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="h-14 flex items-center justify-start">
                    {loading ? (
                        <div className="w-7 spinner">
                            <img src={spinner} alt="" className="min-w-full" />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="mt-2 h-10 px-6 font-semibold bg-black text-white"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </Form>
        </section>
    );
}

export default Authorize;
