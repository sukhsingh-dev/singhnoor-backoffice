'use client'

import axios from "axios"
import { useRouter } from "next/navigation";

const DeleteItem = (item: any) => {
  const router = useRouter();

  const handleClick = async () => {
    alert(`sure to delete ${item.id}`)
    const deletion = await axios.delete(`/api/categories/${item.id}`)

    if (deletion.status === 200) {
      alert("Product Deleted");
      router.push('/dashboard/categories/')
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

export default DeleteItem;
