import CategoryForm from "../../CategoryForm"

export default async function EditPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.APP_URL}/api/categories/${params.id}`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-form-main">
      <CategoryForm title="Edit Category" formData={data} />
    </main>
  )
}