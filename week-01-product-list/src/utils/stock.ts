import type { Product } from "../data/types";

export function isInStock(product: Product): boolean {
	return product.stock > 0
}
