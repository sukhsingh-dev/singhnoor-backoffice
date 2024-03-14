
'use client'

import axios from "axios";
import { FormEvent, useState } from "react"

const NewProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const createProduct = async (ev: FormEvent) => {
    ev.preventDefault();
    const data = { title, description, price }
    await axios.post('/api/products', data)
  }

  return (
    <main>
      <h1>Add New Product</h1>
      <form
        className="sn-form"
        onSubmit={createProduct}
      >
        <input
          type="text"
          placeholder="Product Name"
          className="sn-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Product Description"
          className="sn-input sn-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="sn-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" >Save</button>
      </form>
    </main>
  )
}

export default NewProductPage