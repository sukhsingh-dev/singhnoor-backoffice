import Link from "next/link"

const CategoriesPage = () => {
  return (
    <main>
      <Link href="/dashboard/categories/new" className="btn btn-secondary">Add new Category</Link>
    </main>
  )
}

export default CategoriesPage