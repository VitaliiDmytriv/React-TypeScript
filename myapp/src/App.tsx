import { AlertTailwind } from './AlertTailwind';
import './App.css';

function App() {
    return (
        <div className="container">
            <AlertTailwind closable heading="Success">
                Everything is really good!
            </AlertTailwind>
        </div>
    );
}

export default App;
