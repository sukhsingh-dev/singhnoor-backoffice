/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import DropDown from "@/shared/components/Dropdown";
import Icon from "@/shared/components/Icon";
import DeleteSlide from "./DeleteSlide";

const CarouselPage = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/carousel`, { cache: 'no-store' });
  const data = await res.json()

  return (
    <main className="sn-main-table">
      <div className="sn-main-table-header">
        <h2>Carousel Items</h2>
        <Link href="/dashboard/carousel/new" className="btn btn-secondary">Add new Carousel Item</Link>
      </div>
      <div className="table-responsive" >
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Title</th>
              <th>Description</th>
              <th>URL</th>
              <th>Mobile Image</th>
              <th>Desktop Image</th>
            </tr>
          </thead>
          <tbody className="sn-table-body">
            {
              data.map((carousel: any, index: number) => {
                return (
                  <tr key={carousel._id}>
                    <td>{index + 1}</td>
                    <td>{carousel.slideTitle}</td>
                    <td>{carousel.description}</td>
                    <td>{carousel.slideLink}</td>
                    <td>
                      <img src={carousel.productImagesArray[0]} alt="Mobile" className="thumb-img image-mobile" />
                    </td>
                    <td>
                      <img src={carousel.productImagesArray[1]} alt="Desktop" className="thumb-img image-desktop" />
                    </td>
                    <td className="product-actions" >
                      <DropDown
                        menu={<Icon name="menu-vertical" />}
                        items={
                          <ul>
                            
                            <li>
                              <Link href={`/dashboard/carousel/edit/${carousel._id}`} className="btn-link btn-edit" >Edit</Link>
                            </li>
                            <li>
                              <DeleteSlide item={carousel._id} />
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

export default CarouselPage