import React from 'react';
import Select from 'react-select';
const customStyles = {
  option: (provided: any, state: { isSelected: any; }) => ({
    ...provided,
    fontSize: '14px',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#2684FF' : 'transparent',
    '&:hover': {
      backgroundColor: '#DEEBFF'
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: '14px'
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '12px',
  }),
};

interface Option {
  value: number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange?: (selectedOption: Option | null) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  return (
    <Select 
      options={options}
      isSearchable={true}
      onChange={onChange}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
