'use client'

import Select from 'react-select'

interface MultiSelectType {
  options: Array<string>,
  setSelectedOption: any
}

const MultiSelect = ({ options, setSelectedOption }: MultiSelectType) => {
  return (
    <Select
      isMulti
      options={options}
      onChange={setSelectedOption}
    />
  )
}

export default MultiSelect
