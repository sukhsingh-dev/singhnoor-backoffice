/* eslint-disable @next/next/no-img-element */

'use client'

import Icon from "@/shared/components/Icon";
import SnUploadButton from "@/shared/components/UploadButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';

interface FormType {
  title: string,
  formData?: any
}


const CategoryForm = ({ title, formData }: FormType) => {
  const [categoryName, setCategoryName] = useState(formData?.category.categoryName || '');
  const [categoryBg, setCategoryBg] = useState(formData?.category.categoryBg || '#208a65');
  const [categoryImg, setCategoryImg] = useState(formData?.category.categoryImg || '');
  const [categoryAttributes, setCategoryAttributes] = useState(formData?.category.categoryAttributes || []);
  const [subCategory, setSubCategory] = useState(formData?.category.subCategory || [])
  const [categoryImgState, setCategoryImgState] = useState(formData?.category.categoryImg ? 'complete' : '');

  const currentImagePath = formData?.category.categoryImg;

  const router = useRouter();


  const handleSelectChange = (selectedOptions: any) => {
    setCategoryAttributes(selectedOptions)
  }
  const handleCreateSubCategory = (selectedOptions: any) => {
    setSubCategory(selectedOptions)
  }

  const getAttributes = async () => {
    const categoriesList = await axios.get('/api/attributes')
    return categoriesList
  }

  const attributeOptions = (searchValue: string, callback: (options: Array<object>) => void) => {
    const attributeList = getAttributes();
    let newList: Array<object> = []

    attributeList.then((result) => {
      result.data.map((item: any) => {
        const option = { value: item._id, label: item.attributeName }
        newList.push(option)
      })
      callback(newList)
      console.log("View the", newList)
    })
  }

  const saveCategory = async (ev: FormEvent) => {
    ev.preventDefault();
    const categoryId = formData?.category?._id;

    const data = { categoryName, categoryBg, categoryImg, categoryAttributes, subCategory }
    let creation;

    if (categoryId) {
      creation = await axios.put(`/api/categories/${categoryId}`, { ...data, currentImagePath })

    } else {
      creation = await axios.post('/api/categories', data)
    }

    if (creation.status === 200) {
      alert("Product Saved");
      router.push('/dashboard/categories/')
    }
  }

  return (
    <>
      <div className="form-area">
        <h1>{title}</h1>
        <form
          className="sn-form"
          onSubmit={saveCategory}
        >
          <input
            type="text"
            placeholder="Category Name"
            className="sn-input"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="sn-multi-select">
            <CreatableSelect
              isMulti
              isClearable
              onChange={handleCreateSubCategory}
              defaultValue={formData?.category.subCategory}
              instanceId="category-sub"
              placeholder="Add Subcategory"
            />
          </div>
          <div className="sn-multi-select">
            <AsyncSelect
              isMulti
              defaultOptions
              onChange={handleSelectChange}
              loadOptions={attributeOptions}
              defaultValue={formData?.category.categoryAttributes}
              instanceId="category-attribute"
              placeholder="Select Attributes"
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
              <SnUploadButton imgInfo={setCategoryImg} imgState={setCategoryImgState} />
            </div>
          </label>
          <button className="btn btn-primary" type="submit" >Save</button>
        </form>
      </div>
      <div className="preview area">
        <h2>Preview Area</h2>
        <div className="preview-container" >
          <div className="category-img">
            {categoryImg && categoryImgState === 'complete' ?
              <img src={categoryImg} alt="" width={175} height={175} />
              : ''
            }
            {
              categoryImgState === 'begin' ? 'Image Loading...' : ''
            }
          </div>
          {
            categoryName ?
              <>
                <div className="category-name">{categoryName}</div>
                <svg className="category-name-svg" width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </>
  )
}

export default CategoryForm;