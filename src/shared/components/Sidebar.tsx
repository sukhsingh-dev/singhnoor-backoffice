'use client'

import Link from "next/link"
import Icon from "./Icon"
import Logout from "./Logout"
import { usePathname } from 'next/navigation'
import { useState } from "react"
/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
  const pathname = usePathname()
  const [categorySubmenus, setCategorySubmenus] = useState(false)
  const [carouselSubmenus, setCarouselSubmenus] = useState(false)

  return (
    <aside className="sn-aside">
      <div className="logo-outer">
        <img src="/images/logo-long.png" alt="SN logo" className="img-invert" height={50} />
      </div>
      <ul className="sn-aside-list">
        <li className={pathname == "/dashboard" ? 'active' : ''}>
          <Link href="/dashboard">
            <Icon name="home" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <Icon name="orders" />
            Orders
          </Link>
        </li>
        <li className={`${pathname.includes('/products') ? 'active' : ''}`}>
          <Link href="/dashboard/products">
            <Icon name="product" />
            Products
          </Link>
        </li>
        <li className={`link-dropdown ${pathname.includes('/categories') ? 'active' : ''}`}>
          <Link href="/dashboard/categories">
            <Icon name="categories" />
            Categories
          </Link>
          <button
            type="button"
            className="btn-dropdown-link-toggle"
            onClick={() => setCategorySubmenus(prev => !prev)}
          >
            <Icon name="chevron-down" />
          </button>
          {
            categorySubmenus &&
            <ul className="link-submenus" >
              <li>
                <Link href="/dashboard/categories/new" >New Category</Link>
              </li>
              <li>
                <Link href="/dashboard/attributes">Attributes List</Link>
              </li>
              <li>
                <Link href="/dashboard/attributes/new">New Attributes</Link>
              </li>
            </ul>
          }
        </li>
        <li>
          <button
            type="button"
            className="btn-dropdown-items"
            onClick={() => setCarouselSubmenus(prev => !prev)}
          >
            <Icon name="frontend" />
            Frontend
            <Icon name="chevron-down" />
          </button>
          { carouselSubmenus &&
            <ul className="link-submenus" >
              <li>
                <Link href="/dashboard/carousel" >Carousel</Link>
              </li>
            </ul>
          }
        </li>

        <li>
          <Link href="/users">
            <Icon name="users" />
            Users
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <Icon name="settings" />
            Taxes and Offers
          </Link>
        </li>
        <li>
          <Logout className="btn-link">
            <Icon name="logout" />
          </Logout>
        </li>
      </ul>

    </aside>
  )
}

export default Sidebar;