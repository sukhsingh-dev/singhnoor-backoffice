import DropDown from "@/shared/components/Dropdown";
import Icon from "@/shared/components/Icon";
import Link from "next/link"
import DeleteAttribute from "./DeleteAttribute";

const AttributePage = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/attributes`, { cache: 'no-store' });
  const data = await res.json()
  console.log("The", data)
  return (
    <main className="sn-main-table" >
      <div className="sn-main-table-header">
        <h2>Attributes Lists</h2>
        <Link href="/dashboard/attributes/new" className="btn btn-secondary">Add new Attributes</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Attribute Name</th>
            <th>Attribute Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((attribute: any, index: number) => {
              return (
                <tr key={attribute._id}>
                  <td>{index + 1}</td>
                  <td>{attribute.attributeName}</td>
                  <td>
                    {
                      attribute.attributeOptions.map((option: any) => {
                        return (
                          <span className="span-attribute" key={option.value}>{option.label}</span>
                        )
                      })
                    }
                  </td>
                  <td className="product-actions" >
                    <DropDown
                      menu={<Icon name="menu-vertical" />}
                      items={
                        <ul>
                          <li>
                            <Link href={`/dashboard/attributes/edit/${attribute._id}`} className="btn-link btn-edit" >Edit</Link>
                          </li>
                          <li>
                            <DeleteAttribute item={attribute._id} />
                          </li>
                        </ul>
                      }
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  )
}

export default AttributePage;
