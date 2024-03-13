import Link from "next/link"

const ProductsPage = () => {
  return (
    <main>
      <Link href="/dashboard/products/new" className="btn btn-secondary">Add new Product</Link>
    </main>
  )
}

export default ProductsPage