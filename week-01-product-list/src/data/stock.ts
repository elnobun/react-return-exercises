import type { Product } from "./types";

export function isInStock(product: Product): boolean {
	return product.stock > 0
}
