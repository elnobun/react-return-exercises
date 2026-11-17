import type { Product } from "../data/types";
import { formatCurrency } from "../utils/formatCurrency";


export default function ProductCard({ product }: { product: Product }) {
	const { title, category, price, stock } = product
	return (

		<li className="product-card">
			<h2>{title}</h2>
			<p className="product-category">{category}</p>
			{stock === 0 && <span className="stock-badge">Out of stock</span>}
			<p className="product-price">{formatCurrency(price)}</p>
		</li>
	)
}
