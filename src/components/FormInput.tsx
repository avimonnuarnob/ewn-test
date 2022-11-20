/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import './formInput.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage: string;
}

function FormInput(props: InputProps) {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        data-focused={focused}
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default FormInput;
