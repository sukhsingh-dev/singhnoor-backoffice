'use client'

const DeleteItem = (item: any) => {

  const handleClick = () => {
    alert(`sure to delete ${item.id}`)
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
