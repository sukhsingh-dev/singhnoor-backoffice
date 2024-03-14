'use client'

import Link from "next/link"
import Icon from "./Icon"
import Logout from "./Logout"
import { useRouter } from "next/router"
import { usePathname } from 'next/navigation'
/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
  const pathname = usePathname()

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
        <li className={(pathname == "/dashboard/products") || (pathname == "/dashboard/products/new") ? 'active' : ''}>
          <Link href="/dashboard/products">
            <Icon name="product" />
            Products
          </Link>
        </li>
        <li>
          <Link href="/dashboard/categories">
            <Icon name="categories" />
            Categories
          </Link>
        </li>
        <li>
          <Link href="/frontend">
            <Icon name="frontend" />
            Frontend Offers
          </Link>
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
            Settings
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