/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import DeleteItem from "@/shared/components/DeleteItem";

const TableData = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/categories`, { cache: 'no-store' });
  const data = await res.json()

  return (
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
            {
              category.subCategory.map((attr: any) => {
                return (
                  <span className="span-attribute" key={attr.value}>{attr.label}</span>
                )
              })
            }
          </td>
          <td>
            <Link href={`/dashboard/categories/edit/${category._id}`} className="btn-link btn-edit" >Edit</Link>
            <DeleteItem id={category._id} />
          </td>
        </tr>
      )
    })
  )
}

export default TableData;