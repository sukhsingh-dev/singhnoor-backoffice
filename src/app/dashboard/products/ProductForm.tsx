/* eslint-disable @next/next/no-img-element */
'use client'

import { FormEvent, useState, useRef } from "react";
import axios from "axios";
import SnUploadButton from "@/shared/components/UploadButton";
import Icon from "@/shared/components/Icon";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/navigation";
import { tagOption } from "@/utils/options";
import JoditEditor from 'jodit-react';
import { ProductCategorySelect, ProductAttributeSelect } from "./asyncSelect";

interface FormType {
  formTitle: string,
  formData?: any
}

const ProductForm = ({ formTitle, formData }: FormType) => {
  // States
  const [productTitle, setTitle] = useState(formData?.productTitle || '');
  const [productDescription, setDescription] = useState(formData?.productDescription || '');
  const [productPrice, setProductPrice] = useState<number | string>(formData?.productPrice || '');
  const [productOldPrice, setProductOldPrice] = useState<number | undefined>();
  const [productCategory, setProductCategory] = useState(formData?.productCategory || []);
  const [productSubCategory, setProductSubCategory] = useState(formData?.productSubCategory || []);
  const [productSubCategoryList, setProductSubCategoryList] = useState(formData?.productCategory?.subCategory || []);
  const [productGender, setProductGender] = useState(formData?.productGender || []);
  const [productSize, setProductSize] = useState(formData?.productSize || []);
  const [productWork, setProductWork] = useState(formData?.productWork || []);
  const [productMaterial, setProductMaterial] = useState(formData?.productMaterial || []);
  const [productColors, setProductColors] = useState(formData?.productColors || []);
  const [productStock, setProductStock] = useState(formData?.productStock || '');
  const [productAdditional, setProductAdditional] = useState(formData?.productAdditional || '');
  const [productImage, setProductImage] = useState('');
  const [productImageState, setProductImageState] = useState('');
  const [productImagesArray, setProductImagesArray] = useState<Array<any>>(formData?.productImagesArray || [])
  const [productAttributes, setProductAttributes] = useState<Array<string>>(formData?.productAttributes || [])
  const [productTags, setProductTags] = useState(formData?.productTags || []);
  const editor = useRef(null);
  const editorAdditional = useRef(null);
  const router = useRouter();

  // Methods
  const handleCategoryChange = (selectedOption: any) => {
    console.log(selectedOption)
    setProductCategory(selectedOption)
    setProductAttributes(selectedOption.attr.map((item: any) => item.label))
    if (selectedOption.subCategory.length) {
      setProductSubCategoryList(selectedOption.subCategory)
    } else {
      setProductSubCategoryList([])
    }
  }

  const updateImagesOrder = (images: Array<string>) => setProductImagesArray(images)
  const roundToNearestTen = (number: number) => Math.round(number / 10) * 10;

  const handleSubCategoryChange = (selectedOption: any) => setProductSubCategory(selectedOption)
  const handleGenderChange = (selectedOptions: any) => setProductGender(selectedOptions)
  const handleTagsChange = (selectedOptions: any) => setProductTags(selectedOptions)
  const handleSizeChange = (selectedOptions: any) => setProductSize(selectedOptions)
  const handleMaterialChange = (selectedOptions: any) => setProductMaterial(selectedOptions)
  const handleWorkChange = (selectedOptions: any) => setProductWork(selectedOptions)
  const handleColorsChange = (selectedOptions: any) => setProductColors(selectedOptions)

  const handlePriceChange = (itemPrice: number) => {
    setProductPrice(itemPrice > 0 ? itemPrice : '')
    setProductOldPrice(roundToNearestTen(itemPrice + (itemPrice / 2.5)))
  }

  const removeImage = (imgName: string) => {
    const newArray = productImagesArray.filter(item => item !== imgName);
    setProductImagesArray(newArray);
  }

  const createProduct = async (ev: FormEvent) => {
    ev.preventDefault();
    const data = {
      productCategory,
      productSubCategory,
      productTitle,
      productGender,
      productPrice,
      productDescription,
      productAdditional,
      productStock,
      productTags,
      productImagesArray,
      productSize,
      productMaterial,
      productColors,
      productWork
    }

    let creation;
    const productId = formData?._id;

    if (productId) {
      const currentImageArray = formData?.productImagesArray;
      creation = await axios.put(`/api/products?id=${productId}`, { ...data, currentImageArray })
    } else {
      creation = await axios.post('/api/products', data)
    }

    if (creation?.status === 200) {
      alert("Product created")
      router.push('/dashboard/products/')
    }
  }

  return (
    <>
      <div className="form-area">
        <h1>{formTitle}</h1>
        <form
          className="sn-form"
          onSubmit={createProduct}
        >
          <ProductCategorySelect
            handleChange={handleCategoryChange}
            defaultVal={formData?.productCategory}
          />
          <div className="sn-multi-select">
            {
              productSubCategoryList.length || formData?.productSubCategory ?
                <Select
                  onChange={handleSubCategoryChange}
                  defaultValue={formData?.productSubCategory}
                  options={productSubCategoryList}
                  instanceId="product-sub-categories"
                  placeholder="Select Subcategory"
                /> : ''
            }
          </div>
          <input
            type="text"
            placeholder="Product Name"
            className="sn-input sn-input-full"
            value={productTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ProductAttributeSelect
            handleChange={handleGenderChange}
            defaultVal={formData?.productGender}
            attributeId="661bd7447776e03417fef9f1"
            attributeName="Gender"
          />
          <input
            type="number"
            placeholder="Price"
            className="sn-input"
            value={productPrice}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
          />
          <JoditEditor
            ref={editor}
            value={productDescription}
            onChange={newContent => setDescription(newContent)}
          />
          <JoditEditor
            ref={editorAdditional}
            value={productAdditional}
            onChange={newContent => setProductAdditional(newContent)}
          />
          <input
            type="number"
            placeholder="In Stock"
            className="sn-input"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
          <div className="sn-multi-select">
            <CreatableSelect
              isMulti
              isClearable
              onChange={handleTagsChange}
              defaultValue={formData?.productTags}
              options={tagOption}
              instanceId="product-tags"
              placeholder="Add Tags"
            />
          </div>
          {
            productAttributes.includes('Size') || formData?.productSize.length ?
              <ProductAttributeSelect
                handleChange={handleSizeChange}
                defaultVal={formData?.productSize}
                attributeId="661bc7447776e03417fef9b9"
                attributeName="Size"
              /> : ''
          }
          {
            productAttributes.includes('Material') || formData?.productMaterial.length ?
              <ProductAttributeSelect
                handleChange={handleMaterialChange}
                defaultVal={formData?.productMaterial}
                attributeId="661bd5207776e03417fef9ee"
                attributeName="Material"
              /> : ''
          }
          {
            productAttributes.includes('Work') || formData?.productWork.length ?
              <ProductAttributeSelect
                handleChange={handleWorkChange}
                defaultVal={formData?.productWork}
                attributeId="661bd4ee7776e03417fef9eb"
                attributeName="Work"
              /> : ''
          }
          {
            productAttributes.includes('Colors') || formData?.productColors.length ?
              <ProductAttributeSelect
                handleChange={handleColorsChange}
                defaultVal={formData?.productColors}
                attributeId="661bd4ca7776e03417fef9e8"
                attributeName="Colors"
              /> : ''
          }
          <div className="product-images" >
            <ReactSortable list={productImagesArray} setList={updateImagesOrder}>
              {
                productImagesArray.length &&
                productImagesArray.map((imgName) => {
                  if (imgName != '') {
                    return (
                      <div className="thumb-img-outer" key={imgName}>
                        <img src={imgName} alt="image" width={80} height={80} />
                        <button
                          type="button"
                          aria-label="remove-image"
                          onClick={() => removeImage(imgName)}
                        >
                          <Icon name="close" />
                        </button>
                      </div>
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
          <div className="product-card-outer" >
            {
              productImagesArray.length ?
                <>
                  <img
                    src={productImagesArray[0]}
                    alt="image"
                    key={productImagesArray[1]}
                    width={250}
                    height={250}
                    className="product-img"
                  />
                  <span className="product-img-bg" />
                </>
                : ''
            }
            {productTitle ? <h3 className="product-name" >{productTitle}</h3> : ''}
            {productPrice ?
              <>
                <div className="old-price" >₹{productOldPrice}</div>
                <div className="new-price" >₹{productPrice}</div>
              </>
              : ''
            }
            {
              productTitle ?
                <>
                  <div className="btn-product" >
                    <Icon name="cart" width={24} height={24} />
                  </div>
                  <div className="heart-icon" >
                    <Icon name="heart" width={20} height={20} />
                  </div>
                </> : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductForm;