import { useActionData } from 'react-router';

function Main() {
    const data = useActionData();
    console.log(data);

    return <div>Hello</div>;
}

export default Main;
