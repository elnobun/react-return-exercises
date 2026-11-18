import type { SortOption } from "../data/types"
import { formatCategory } from "../utils/formatCategory"

type SearchProps = {
	categories: string[],
	filterText: string,
	filterCategory: string,
	inStockOnly: boolean,
	sortByPrice: SortOption,
	onSortChange: (value: SortOption) => void,
	onFilterTextChange: (value: string) => void,
	onFilterCategoryChange: (value: string) => void,
	onInStockOnlyChange: (value: boolean) => void
}

export default function Search({
	categories,
	filterText,
	filterCategory,
	inStockOnly,
	sortByPrice,
	onSortChange,
	onFilterTextChange,
	onFilterCategoryChange,
	onInStockOnlyChange
}: SearchProps) {
	return (
		<form className="filters" role="search">
			<div className="field">
				<label htmlFor="product-search">Search by name</label>
				<input
					id="product-search"
					type="search"
					value={filterText}
					onChange={(e) => onFilterTextChange(e.target.value)}
				/>
			</div>
			<div className="field">
				<label htmlFor="product-category">Category</label>
				<select
					id="product-category"
					value={filterCategory}
					onChange={(e) => onFilterCategoryChange(e.target.value)}>
					<option value="">All categories</option>
					{categories.map(category => (
						<option key={category} value={category}>{formatCategory(category)}</option>
					))}
				</select>
			</div>
			<div className="field">
				<label htmlFor="product-sort">Sort by</label>
				<select
					id="product-sort"
					value={sortByPrice}
					onChange={(e) => onSortChange(e.target.value as SortOption)}>
					<option value="">Default order</option>
					<option value="price-asc">Price: low to high</option>
					<option value="price-desc">Price: high to low</option>
				</select>
			</div>
			<div className="field field-checkbox">
				<input
					id="in-stock-only"
					type="checkbox"
					checked={inStockOnly}
					onChange={(e) => onInStockOnlyChange(e.target.checked)}
				/>
				<label htmlFor="in-stock-only">In stock only</label>
			</div>
		</form>
	)
}
