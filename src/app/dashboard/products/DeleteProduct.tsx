'use client'

import axios from "axios"
import { useRouter } from "next/navigation";

const DeleteProduct = ({ item }: any) => {
  const router = useRouter();
  const handleClick = async () => {
    const isConfirm = confirm(`sure to delete`)
    if (isConfirm) {
      const deletion = await axios.delete(`/api/products?id=${item}`)

      if (deletion.status === 200) {
        alert("Product Deleted");
        router.push('/dashboard/products/')
      }
    }
  }

  return (
    <button
      className="btn-delete"
      type="button"
      onClick={handleClick}
    >
      Delete
    </button>
  )
}

export default DeleteProduct;
