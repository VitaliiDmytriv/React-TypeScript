import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSomeContext } from './AppContext';

function App() {
    const { user } = useSomeContext();
    console.log(user);

    return (
        <div className="App bg-emerald-100 pt-4 min-h-screen px-3">
            <div className="bg-white p-2 mb-5 shadow-md border-t-2 border-slate-200 rounded-md">
                {user ? (
                    <h1 className="text-center text-2xl">Hello, {user.name}</h1>
                ) : (
                    <NavLink to="authorize">
                        <h1 className="text-center text-2xl">Please Sign In</h1>
                    </NavLink>
                )}
            </div>
            <Outlet />
        </div>
    );
}

export default App;
