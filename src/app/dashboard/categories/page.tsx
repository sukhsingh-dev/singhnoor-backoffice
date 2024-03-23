import Link from "next/link"
import TableData from "./client/table"
const CategoriesPage = async () => {
  return (
    <main className="sn-main-table" >
      <div className="sn-main-table-header">
        <h2>Categories Lists</h2>
        <Link href="/dashboard/categories/new" className="btn btn-secondary">Add new Category</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Img</th>
            <th>Name</th>
            <th>Bg Color</th>
            <th>Attributes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TableData />
        </tbody>
      </table>
    </main>
  )
}

export default CategoriesPage