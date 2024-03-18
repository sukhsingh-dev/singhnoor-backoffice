/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const CategoriesPage = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/categories`);
  const data = await res.json()

  return (
    <main className="sn-main-table" >
      <div className="sn-main-table-header">
        <h2>Category Details</h2>
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
          {
            data.map((category: any, index: number) => {
              return (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td><img src={category.categoryImg} alt="image" width={40} height={40} /></td>
                  <td>{category.categoryName}</td>
                  <td><span className="bg-span" style={{ background: category.categoryBg }} /></td>
                  <td>
                    {
                      category.categoryAttributes.map((attr: any) => {
                        return (
                          <span className="span-attribute" key={attr.value}>{attr.label}</span>
                        )
                      })
                    }
                  </td>
                  <td>
                    <button className="btn-edit" >Edit</button>
                    <button className="btn-delete" >Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  )
}

export default CategoriesPage