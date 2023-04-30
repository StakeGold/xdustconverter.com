export const accountTokensStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#242526',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#9ba5b4' : '#242526',
    boxShadow: state.isFocused ? '0 0 0 1px #242526' : 'none',
    '&:hover': {
      borderColor: '#9ba5b4'
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    padding: 6,
    fontSize: 14,
    color: '#9ba5b4',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: state.isSelected ? '#1e1e1f' : '#242526',
    '&:hover': {
      backgroundColor: '#1e1e1f'
    }
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    width: 'max-content',
    minWidth: '100%',
    color: state.selectProps.menuColor,
    padding: 0,
    backgroundColor: '#242526'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white'
  })
};
