import './input.css';

const Input = ({
  className = '',
  type = 'text',
  onChange,
  onKeydown,
  placeHolder,
  value,
  min,
  disabled,
}) => {
  return (
    <div>
      <input
        className={`custom-input ${className}`}
        placeholder={placeHolder}
        min={min}
        value={value}
        disabled={disabled}
        onChange={onChange}
        type={type}
        autoComplete="on"
      />
    </div>
  );
};

export default Input;
