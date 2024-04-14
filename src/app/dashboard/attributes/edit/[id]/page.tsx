import AttributeForm from "../../AttributeForm";


export default async function EditPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.APP_URL}/api/attributes?id=${params.id}`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-form-main">
      <div className="sn-notify sn-notify-warning" >Please refresh before editing <strong>(Ctrl+Shift+R)</strong></div>
      <AttributeForm title="Edit Attribute" formData={data} />
    </main>
  )
}