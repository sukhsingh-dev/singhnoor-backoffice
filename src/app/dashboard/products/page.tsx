import Link from "next/link"
import DeleteProduct from "./DeleteProduct";
import DropDown from "@/shared/components/Dropdown";
import Icon from "@/shared/components/Icon";

const ProductsPage = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/products`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-main-table">
      <div className="sn-main-table-header">
        <h2>Products Lists</h2>
        <Link href="/dashboard/products/new" className="btn btn-secondary">Add new Product</Link>
      </div>
      <div className="table-responsive" >
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Category</th>
              <th>Sub</th>
              <th className="product-name" >Name</th>
              <th>Gender</th>
              <th>Size</th>
              <th>Material</th>
              <th>Colors</th>
              <th>Work</th>
              <th>Tags</th>
              <th>Price</th>
              <th className="product-actions" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((product: any, index: number) => {
                return (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.productCategory.label}</td>
                    <td>{product?.productSubCategory?.label}</td>
                    <td>{product.productTitle}</td>
                    <td>
                      {
                        product.productGender.map((gender: any) => {
                          return (
                            <span className="span-attribute" key={gender.value}>{gender.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>
                      {
                        product.productSize?.map((size: any) => {
                          return (
                            <span className="span-attribute" key={size.value}>{size.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>
                      {
                        product.productMaterial?.map((material: any) => {
                          return (
                            <span className="span-attribute" key={material.value}>{material.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>
                      {
                        product.productColors?.map((color: any) => {
                          return (
                            <span className="span-attribute" key={color.value}>{color.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>
                      {
                        product.productWork?.map((work: any) => {
                          return (
                            <span className="span-attribute" key={work.value}>{work.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>
                      {
                        product.productTags?.map((tag: any) => {
                          return (
                            <span className="span-attribute" key={tag.value}>{tag.label}</span>
                          )
                        })
                      }
                    </td>
                    <td>₹{product.productPrice}</td>

                    <td className="product-actions" >
                      <DropDown
                        menu={<Icon name="menu-vertical" />}
                        items={
                          <ul>
                            <li>
                              <a href={`${process.env.FRONTEND_URL}/product/${product._id}`} className="btn-link btn-view" target="_blank" >View</a>
                            </li>
                            <li>
                              <Link href={`/dashboard/products/edit/${product._id}`} className="btn-link btn-edit" >Edit</Link>
                            </li>
                            <li>
                              <DeleteProduct item={product._id} />
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
      </div>
    </main>
  )
}

export default ProductsPage