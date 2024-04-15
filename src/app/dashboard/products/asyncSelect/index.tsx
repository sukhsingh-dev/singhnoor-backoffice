import axios from "axios"
import AsyncSelect from "react-select/async"

interface SelectTypes {
  handleChange: (selectedOption: any) => void
  defaultVal: any
  attributeId?: string
  attributeName?: string
}

const callAPI = async (apiPath: string) => {
  const data = await axios.get(apiPath)
  return data
}

export const ProductCategorySelect = ({ handleChange, defaultVal }: SelectTypes) => {
  const categoriesOptions = (searchValue: string, callback: (options: Array<object>) => void) => {
    const categoryList = callAPI('/api/categories');
    let newList: Array<object> = []

    categoryList.then((result) => {
      result.data.map((item: any) => {
        const option = { value: item._id, label: item.categoryName, attr: item.categoryAttributes, subCategory: item.subCategory }
        newList.push(option)
      })
      callback(newList)
    })
  }

  return (
    <div className="sn-multi-select">
      <AsyncSelect
        onChange={handleChange}
        defaultValue={defaultVal}
        loadOptions={categoriesOptions}
        defaultOptions
        instanceId="product-categories"
        placeholder="Select Category"
      />
    </div>
  )
}

export const ProductAttributeSelect = ({ handleChange, defaultVal, attributeId, attributeName }: SelectTypes) => {
  const getOptions = (searchValue: string, callback: (options: Array<object>) => void) => {
    const attributeResults = callAPI(`/api/attributes?id=${attributeId}`);
    attributeResults.then((result) => {
      callback(result.data.attributeOptions)
    })
  }

  return (
    <div className="sn-multi-select">
      <AsyncSelect
        isMulti
        onChange={handleChange}
        defaultValue={defaultVal}
        loadOptions={getOptions}
        defaultOptions
        instanceId={`product-${attributeName}`}
        placeholder={`Select ${attributeName}`}
      />
    </div>
  )
}
