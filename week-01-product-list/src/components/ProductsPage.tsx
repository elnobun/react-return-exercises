import { useState } from "react"
import { type SortOption, type Product } from "../data/types"
import ProductList from "./ProductList"
import Search from "./Search"
import { isInStock } from "../utils/stock"


export default function ProductsPage({ products }: { products: Product[] }) {
	const [filterText, setFilterText] = useState("")
	const [filterCategory, setFilterCategory] = useState("")
	const [sortByPrice, setSortByPrice] = useState<SortOption>("");
	const [inStockOnly, setInStockOnly] = useState(false)

	const searchText = filterText.toLowerCase().trim()

	const filteredProducts = products.filter((product) => {
		const matchText = product.title.toLowerCase().includes(searchText)
		const matchCategory = filterCategory === "" || product.category === filterCategory
		const matchStock = !inStockOnly || isInStock(product)

		return matchText && matchCategory && matchStock
	})

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortByPrice === "price-asc") return a.price - b.price
		if (sortByPrice === "price-desc") return b.price - a.price
		return 0
	})

	// Avoid duplicates in category select
	const categories = Array.from(new Set(
		products.map(product => product.category)
	))

	return (
		<>
			<h1>Products</h1>
			<p className="page-intro">Search and filter the product catalogue.</p>
			<Search
				categories={categories}
				filterText={filterText}
				filterCategory={filterCategory}
				inStockOnly={inStockOnly}
				sortByPrice={sortByPrice}
				onSortChange={setSortByPrice}
				onFilterTextChange={setFilterText}
				onFilterCategoryChange={setFilterCategory}
				onInStockOnlyChange={setInStockOnly}
			/>
			<p className="results-count" aria-live="polite">
				Showing {filteredProducts.length} of {products.length} products
			</p>

			<ProductList products={sortedProducts} />
		</>
	)
}
