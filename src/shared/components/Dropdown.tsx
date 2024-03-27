'use client'

import { useState } from "react"

interface DropDownTypes {
  menu: React.ReactNode
  items: React.ReactNode
}

const DropDown = ({ menu, items }: DropDownTypes) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`dropdown-outer ${isOpen ? 'active' : ''} `}
    >
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="dropdown-menu"
      >
        {menu}
      </button>
      <div
        className="dropdown-items"
      >{items}</div>
    </div>
  )
}

export default DropDown
