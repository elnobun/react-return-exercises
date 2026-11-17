import type { Product } from "../data/types";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
	return (
		<>
			{products.length > 0 ? (
				<>
					<ul className="product-list">
						{
							products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
						}
					</ul>
				</>
			) : (
				<div className="empty-state">
					<p>No products match your search.</p>
					<p>Try a different name, choose another category, or untick "In stock only".</p>
				</div>
			)}

		</>
	)
}
