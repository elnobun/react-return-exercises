import type { Product } from "../data/types";
import { formatCurrency } from "../utils/formatCurrency";
import { isInStock } from "../utils/stock";


export default function ProductCard({ product }: { product: Product }) {
	const { title, category, price } = product
	return (

		<li className="product-card">
			<h2>{title}</h2>
			<p className="product-category">{category}</p>
			{!isInStock(product) && <span className="stock-badge">Out of stock</span>}
			<p className="product-price">{formatCurrency(price)}</p>
		</li>
	)
}
