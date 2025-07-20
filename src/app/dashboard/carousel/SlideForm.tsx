'use client'

import JoditEditor from 'jodit-react';
import { FormEvent, useState, useRef } from "react";
import SnUploadButton from "@/shared/components/UploadButton";
import Icon from "@/shared/components/Icon";
import { ReactSortable } from "react-sortablejs";
import axios from 'axios';
import { useRouter } from "next/navigation";

interface FormType {
  formTitle: string,
  formData?: any
}

const SlideForm = ({ formTitle, formData }: FormType) => {
    const editor = useRef(null);
    const [slideTitle, setTitle] = useState(formData?.slideTitle || '');
    const [slideLink, setSlideLink] = useState(formData?.slideLink || '');
    const [description, setDescription] = useState(formData?.description || '');
    const [productImage, setProductImage] = useState('');
    const [productImageState, setProductImageState] = useState('');
    const [productImagesArray, setProductImagesArray] = useState<Array<any>>(formData?.productImagesArray || [])
    const router = useRouter();
    
    const updateImagesOrder = (images: Array<string>) => setProductImagesArray(images)
    const removeImage = (imgName: string) => {
      const newArray = productImagesArray.filter(item => item !== imgName);
      setProductImagesArray(newArray);
    }

    const createCarouselSlide = async (ev: FormEvent) => {
        ev.preventDefault();

        const newSlide = {
            slideTitle,
            description,
            productImagesArray,
            slideLink
        };

        const slideId = formData?._id;
        if (slideId) {
          const update = await axios.put(`/api/carousel?id=${slideId}`, newSlide)
          if (update?.status === 200) {
            alert("Slide updated")
            router.push('/dashboard/carousel')
          }
        } else {
          const creation = await axios.post('/api/carousel', newSlide)
          if (creation?.status === 200) {
            alert("Slide created")
            router.push('/dashboard/carousel')
          }
        }
    }

  return (
    <main className="sn-form-product form-area">
     <h1>{formTitle}</h1>
     <span></span>
      <form 
        className="sn-form "
        onSubmit={createCarouselSlide}
      >
        <input
            type="text"
            placeholder="Carousel Slide Title"
            className="sn-input sn-input-full"
            value={slideTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Carousel Slide URL"
            className="sn-input sn-input-full"
            value={slideLink}
            onChange={(e) => setSlideLink(e.target.value)}
          />
        <JoditEditor
            ref={editor}
            value={description}
            onChange={newContent => setDescription(newContent)}
          />
        <label className="sn-input-label-set sn-input-upload">
            <span>Carousel Images</span>
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
                  <div className="product-images" >
            <ReactSortable list={productImagesArray} setList={updateImagesOrder}>
              {
                productImagesArray.length &&
                productImagesArray.map((imgName) => {
                  if (imgName != '') {
                    return (
                      <div className="thumb-img-outer" key={imgName}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
         <button className="btn btn-primary" type="submit" >Save</button>
      </form>
    </main>
  )
}

export default SlideForm