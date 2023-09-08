import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

export function ProductsPage() {
    const [searchParams] = useSearchParams();

    function getFilteredProducts() {
        const search = searchParams.get('search');
        if (search === null || search === '') {
            return products;
        } else {
            return products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()),
            );
        }
    }

    return (
        <div className="text-center p-5">
            <h2 className="text-xl font-bold text-slate-600">
                Here are some great tools for React
            </h2>
            <ul className="list-none m-0 p-0">
                {getFilteredProducts().map((product) => (
                    <li key={product.id} className="p-1 text-base textslate-800">
                        <Link to={`${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
