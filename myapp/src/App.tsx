import './App.css';
import { Alert } from './Alert';

function App() {
    return (
        <div className="App">
            <Alert closable heading="Success">
                Everything is really good!
            </Alert>
        </div>
    );
}

export default App;
