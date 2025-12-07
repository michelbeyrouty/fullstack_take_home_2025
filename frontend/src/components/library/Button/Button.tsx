import "./Button.css";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, disabled, ...props }: IProps) {
  return (
    <button disabled={disabled} {...props}>
      {children}
    </button>
  );
}
