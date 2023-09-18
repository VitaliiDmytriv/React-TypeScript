import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function MyModal({ children }: Props) {
    return (
        <div className="myModal z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="px-6 py-3 bg-slate-300 text-black rounded-md">{children}</div>
        </div>
    );
}

export default MyModal;
