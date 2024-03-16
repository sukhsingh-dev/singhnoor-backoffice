/* eslint-disable @next/next/no-img-element */

'use client'

import Icon from "@/shared/components/Icon";
import SnUploadButton from "@/shared/components/UploadButton";
import axios from "axios";
import { FormEvent, useState } from "react"
import Select from 'react-select';

const options = [
  { value: 'size', label: 'Size' },
  { value: 'colors', label: 'Colors' },
  { value: 'material', label: 'Material' },
  { value: 'work', label: 'Work' }
];

const NewCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryBg, setCategoryBg] = useState('#208a65');
  const [categoryImg, setCategoryImg] = useState('');
  const [categoryAttributes, setCategoryAttributes] = useState([]);

  const handleSelectChange = (selectedOptions: any) => {
    setCategoryAttributes(selectedOptions)
  }

  const createCategory = async (ev: FormEvent) => {
    ev.preventDefault();
    console.log(categoryAttributes)
    // const data = { title, description, price }
    // await axios.post('/api/products', data)
  }

  return (
    <main>
      <div className="form-area">
        <h1>Add New Category</h1>
        <form
          className="sn-form"
          onSubmit={createCategory}
        >
          <input
            type="text"
            placeholder="Category Name"
            className="sn-input"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="sn-multi-select">
            <Select
              isMulti
              onChange={handleSelectChange}
              options={options}
              instanceId="category-attribute"
            />
          </div>
          <label className="sn-input-label-set sn-input-color">
            <span>Category Background</span>
            <div style={{ backgroundColor: categoryBg }} className="color-picker" />
            <input
              type="color"
              placeholder="Category Color"
              value={categoryBg}
              onChange={(e) => setCategoryBg(e.target.value)}
            />
          </label>
          <label className="sn-input-label-set sn-input-upload">
            <span>Category Image</span>
            <div className="upload-file">
              <Icon name="upload" />
              <SnUploadButton imgInfo={setCategoryImg} />
            </div>
          </label>
          <button className="btn btn-primary" type="submit" >Save</button>
        </form>
      </div>
      <div className="preview area">
        <h2>Preview Area</h2>
        <div className="preview-container" >
          <div className="category-img">
            {categoryImg ?
              <img src={categoryImg} alt="" width={175} height={175} />
              : ''
            }
          </div>
          {
            categoryName ?
              <>
                <div className="category-name">{categoryName}</div>
                <svg width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2.59139C0 1.41818 1.00517 0.496933 2.17394 0.598968L62.8457 5.89571C62.9484 5.90468 63.0517 5.90569 63.1545 5.89874L97.8652 3.55342C99.0202 3.47538 100 4.39124 100 5.54888V6.43372C100 7.52866 99.1195 8.42005 98.0247 8.43357L19 9.40918H2C0.895431 9.40918 0 8.51375 0 7.40918V2.59139Z" fill={categoryBg} />
                </svg>
              </> : ''
          }
          {
            categoryImg ?
              <div className="category-bg" style={{ backgroundColor: categoryBg }} />
              : ''
          }
        </div>
      </div>
    </main>
  )
}

export default NewCategoryPage