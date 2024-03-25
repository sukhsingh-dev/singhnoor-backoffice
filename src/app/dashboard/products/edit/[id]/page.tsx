import ProductForm from "../../ProductForm";

export default async function EditPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.APP_URL}/api/products?id=${params.id}`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-form-main sn-form-product">
      <div className="sn-notify sn-notify-warning" >Please refresh before editing <strong>(Ctrl+Shift+R)</strong></div>
      <ProductForm formTitle="Edit Category" formData={data} />
    </main>
  )
}