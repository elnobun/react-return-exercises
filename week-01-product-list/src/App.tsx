import ProductsPage from "./components/ProductsPage"
import { PRODUCTS } from "./data/products"


function App() {

	return (
		<main>
			<div className="page">
				<ProductsPage products={PRODUCTS} />
			</div>
		</main>
	)
}

export default App
