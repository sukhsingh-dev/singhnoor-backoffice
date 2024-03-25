import CategoryForm from "../../CategoryForm"

export default async function EditPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.APP_URL}/api/categories/${params.id}`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-form-main">
      <div className="sn-notify sn-notify-warning" >Please refresh before editing <strong>(Ctrl+Shift+R)</strong></div>
      <CategoryForm title="Edit Category" formData={data} />
    </main>
  )
}