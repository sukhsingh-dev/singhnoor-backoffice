'use client'

import axios from "axios"
import { useRouter } from "next/navigation";

const DeleteProduct = (item: any) => {
  const router = useRouter();

  const handleClick = async () => {
    alert(`sure to delete ${item.id}`)
    const deletion = await axios.delete(`/api/products/${item.id}`)

    if (deletion.status === 200) {
      alert("Category Deleted");
      router.push('/dashboard/products/')
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
