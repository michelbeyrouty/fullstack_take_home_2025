import "./FormTextInput.css";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormTextInput({ label, name, value, onValueChange, ...rest }: Props) {
  return (
    <p className="form-text-input">
      <label>{label} </label>
      <input {...rest} name={name} value={value} onChange={onValueChange} />
    </p>
  );
}
