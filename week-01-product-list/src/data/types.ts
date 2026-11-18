export interface Product {
	id: number;
	title: string;
	category: string;
	price: number;
	stock: number;
}

export type SortOption = "" | "price-asc" | "price-desc"
