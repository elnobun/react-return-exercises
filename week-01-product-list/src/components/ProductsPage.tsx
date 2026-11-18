import { useState } from "react"
import type { Product } from "../data/types"
import ProductList from "./ProductList"
import Search from "./Search"

export default function ProductsPage({ products }: { products: Product[] }) {
	const [filterText, setFilterText] = useState("")
	const [filterCategory, setFilterCategory] = useState("")
	const [inStockOnly, setInStockOnly] = useState(false)

	const filteredProducts = products.filter((product) => {
		const matchText = product.title.toLowerCase().includes(filterText.trim().toLowerCase())

		return matchText
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
				onFilterTextChange={setFilterText}
				onFilterCategoryChange={setFilterCategory}
				onInStockOnlyChange={setInStockOnly}
			/>
			<ProductList products={filteredProducts} />
		</>
	)
}
