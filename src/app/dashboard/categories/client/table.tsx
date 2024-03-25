/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import DeleteItem from "@/shared/components/DeleteItem";
// import { useEffect, useState } from "react";
import axios from "axios";

const TableData = async () => {
  // const [data, setData] = useState([])
  // useEffect(() => {
  //   const getCategories = async () => {
  //     const res = await axios.get('/api/categories');
  //     return res;
  //   }

  //   getCategories().then((result) => {
  //     const inside = result.data;
  //     setData(inside)
  //   })
  // }, [])

  const res = await fetch(`${process.env.APP_URL}/api/categories`, { next: { tags: ['category'] } });
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
            <Link href={`/dashboard/categories/edit/${category._id}`} className="btn-link btn-edit" >Edit</Link>
            <DeleteItem id={category._id} />
          </td>
        </tr>
      )
    })
    // < tr > <td>a</td></ >
  )
}

export default TableData;