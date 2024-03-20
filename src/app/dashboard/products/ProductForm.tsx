/* eslint-disable @next/next/no-img-element */
'use client'

import { FormEvent, useState } from "react";
import axios from "axios";
import SnUploadButton from "@/shared/components/UploadButton";
import Icon from "@/shared/components/Icon";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ReactSortable } from "react-sortablejs";

const genderOptions = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'couple', label: 'Couple' },
  { value: 'kids', label: 'Kids' }
];

const sizeOptions = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' },
  { value: '3xl', label: '3XL' }
];

const workOptions = [
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' }
];

const colorOptions = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' }
];

const gatraMaterialOptions = [
  { value: 'leather', label: 'Leather' },
  { value: 'clothe', label: 'Clothe' }
];

const tshirtMaterialOptions = [
  { value: 'cotton', label: 'Cotton' },
  { value: 'linen', label: 'Linen' }
];

const leatherMaterialOption = [
  { value: 'darkLeather', label: 'Dark Leather' },
  { value: 'softLeather', label: 'Soft Leather' }
]

const tagOption = [
  { value: 'nihang', label: 'Nihang' },
  { value: 'Khalsa', label: 'Khalsa' },
]

interface FormType {
  formTitle: string,
  formData?: any
}


const ProductForm = ({ formTitle, formData }: FormType) => {
  const [productTitle, setTitle] = useState('');
  const [productDescription, setDescription] = useState('');
  const [productPrice, setPrice] = useState('');

  const [productCategory, setProductCategory] = useState('');
  const [productGender, setProductGender] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productWork, setProductWork] = useState([]);
  const [productMaterial, setProductMaterial] = useState([]);
  const [productInfo, setProductInfo] = useState('');
  const [productStock, setProductStock] = useState(null);


  const [productImage, setProductImage] = useState('');
  const [productImageState, setProductImageState] = useState('');
  const [productImagesArray, setProductImagesArray] = useState<Array<any>>([])

  const updateImagesOrder = (images: Array<string>) => {
    setProductImagesArray(images)
  }

  const createProduct = async (ev: FormEvent) => {
    ev.preventDefault();
    // const data = { title, description, price }
    // await axios.post('/api/products', data)
  }

  return (
    <>
      <div className="form-area">
        <h1>{formTitle}</h1>
        <form
          className="sn-form"
          onSubmit={createProduct}
        >
          <div className="sn-multi-select">
            <Select
              // isMulti
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={genderOptions}
              instanceId="product-categories"
              placeholder="Select Category"
            />
          </div>

          <div className="sn-multi-select">
            <Select
              isMulti
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={genderOptions}
              instanceId="product-genders"
              placeholder="Select Gender"
            />
          </div>
          <input
            type="text"
            placeholder="Product Name"
            className="sn-input"
            value={productTitle}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="sn-input"
            value={productPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Product Description"
            className="sn-input sn-textarea"
            value={productDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Additional Information"
            className="sn-input sn-textarea"
            value={productDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="In Stock"
            className="sn-input"
            value={productPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="sn-multi-select">
            <CreatableSelect
              isMulti
              isClearable
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={tagOption}
              instanceId="product-tags"
              placeholder="Add Tags"
            />
          </div>
          <div className="sn-multi-select">
            <Select
              isMulti
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={sizeOptions}
              instanceId="product-sizes"
              placeholder="Select Size"
            />
          </div>

          <div className="sn-multi-select">
            <Select
              isMulti
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={tshirtMaterialOptions}
              instanceId="product-material"
              placeholder="Select Material"
            />
          </div>
          <div className="sn-multi-select">
            <Select
              isMulti
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={workOptions}
              instanceId="product-work"
              placeholder="Select Work"
            />
          </div>
          <div className="sn-multi-select">
            <CreatableSelect
              isMulti
              isClearable
              // onChange={handleSelectChange}
              // defaultValue={defaultCategoryAttributes}
              options={colorOptions}
              instanceId="product-color"
              placeholder="Select Colors"
            />
          </div>
          <div className="product-images" >
            <ReactSortable list={productImagesArray} setList={updateImagesOrder}>
              {
                productImagesArray.length &&
                productImagesArray.map((imgName) => {
                  if (imgName != '') {
                    return (
                      <img src={imgName} alt="image" key={imgName} width={80} height={80} />
                    )
                  }
                })
              }
            </ReactSortable>
            {
              productImageState === 'begin' ? 'Image Loading...' : ''
            }
          </div>
          <label className="sn-input-label-set sn-input-upload">
            <span>Product Image</span>
            <div className="upload-file">
              <Icon name="upload" />
              <SnUploadButton
                imgInfo={setProductImage}
                imgState={setProductImageState}
                imgArrayState={productImagesArray}
                imgArraySet={setProductImagesArray}
              />
            </div>
          </label>
          <button className="btn btn-primary" type="submit" >Save</button>
        </form>
      </div>
      <div className="preview area">
        <h2>Preview Area</h2>
        <div className="preview-container" >
          {
            productImagesArray.length ?
              <img src={productImagesArray[0]} alt="image" key={productImagesArray[1]} width={120} height={120} />
              : ''
          }
        </div>
      </div>
    </>
  )
}

export default ProductForm;