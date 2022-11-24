import { FC } from "react";
import { Input } from "antd";

interface TextAreaProps {
  placeHolder: string;
  size: any;
  isError: boolean;
  inputHandler: any;
  name: string;
  value: string;
  id?: string;
  type: string;
}

const TextArea: FC<TextAreaProps> = ({
  placeHolder,
  size,
  isError,
  inputHandler,
  name,
  value,
  id,
  type,
}) => {
  return (
    <Input
      status={isError ? "error" : ""}
      placeholder={placeHolder}
      size={size}
      onChange={inputHandler}
      name={name}
      value={value}
      id={id}
      type={type}
    />
  );
};

export default TextArea;
