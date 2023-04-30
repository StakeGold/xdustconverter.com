export const accountTokensStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#242526' : '#1e1e1f',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#242526' : '#1e1e1f',
    boxShadow: state.isFocused ? '0 0 0 1px #242526' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#242526' : '#1e1e1f'
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    padding: 6,
    fontSize: 14,
    color: '#444',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: state.isSelected ? '#242526' : '#1e1e1f',
    '&:hover': {
      backgroundColor: '#242526'
    }
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    width: 'max-content',
    minWidth: '100%',
    color: state.selectProps.menuColor,
    padding: 10,
    backgroundColor: '#1e1e1f'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white'
  })
};
