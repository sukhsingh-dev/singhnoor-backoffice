'use client'

import axios from "axios"
import { useRouter } from "next/navigation";

const DeleteSlide = ({ item }: any) => {
  const router = useRouter();
  const handleClick = async () => {
    const isConfirm = confirm(`sure to delete`)
    if (isConfirm) {
      const deletion = await axios.delete(`/api/carousel?id=${item}`)

      if (deletion.status === 200) {
        alert("Slide Deleted");
        router.push('/dashboard/carousel/')
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

export default DeleteSlide;
