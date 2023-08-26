interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({
  className,
  type,
  disabled,
  ...props
}) => {
  return <input type={type} disabled={disabled} {...props} />;
};

export default Input;
