import './select.css';

const Select = ({
  className = '',
  onChange,
  onKeydown,
  options = [],
  placeHolder = '',
  value = '',
}) => {
  return (
    <div>
      <select
        className={`custom-select ${className} `}
        onChange={onChange}
        autoComplete="on"
        value={value || ''}
      >
        <option className="disableoption" disabled value="">
          {placeHolder}
        </option>
        {options.map(value => {
          if (placeHolder === 'Specialization') {
            return (
              <option key={value.department._id} value={value.department._id}>
                {value.department.name}
              </option>
            );
          } else {
            return (
              <option key={value._id} value={value._id}>
                {value.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Select;
