'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable"
import axios from "axios"

interface FormType {
  title: string,
  formData?: any
}

const AttributeForm = ({ title, formData }: FormType) => {
  const [attributeName, setAttributeName] = useState('');
  const [attributeOptions, setAttributeOptions] = useState([]);
  const router = useRouter();

  const handleCreateAttribute = (selectedOptions: any) => {
    setAttributeOptions(selectedOptions)
  }
  const saveAttribute = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const data = { attributeName, attributeOptions }

    let creation;
    const attributeId = formData?._id;

    if (attributeId) {
      creation = await axios.put(`/api/attributes?id=${attributeId}`, { data })
    } else {
      creation = await axios.post('/api/attributes', data)
    }

    if (creation?.status === 200) {
      alert("Attribute created")
      router.push('/dashboard/attributes/')
    }
  }

  return (
    <div className="form-area">
      <h1>{title}</h1>
      <form
        className="sn-form"
        onSubmit={saveAttribute}
      >
        <input
          type="text"
          placeholder="Attribute Name"
          className="sn-input"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
        />
        <div className="sn-multi-select">
          <CreatableSelect
            isMulti
            isClearable
            onChange={handleCreateAttribute}
            // defaultValue={formData?.category.subCategory}
            instanceId="attribute-values"
            placeholder="Attribute values"
          />
        </div>
        <button className="btn btn-primary" type="submit" >Save</button>
      </form>
    </div>
  )
}

export default AttributeForm;
