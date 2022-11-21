import { FC } from "react";
import { Button } from "antd";

interface DefaultButtonProps {
  isFilled: boolean;
  text: string;
  btnHandler?: () => void;
  type: any;
}

const DefaultButton: FC<DefaultButtonProps> = ({
  isFilled,
  text,
  btnHandler,
  type,
}) => {
  return (
    <Button
      type={isFilled ? "primary" : "default"}
      onClick={btnHandler}
      htmlType={type}
    >
      {text}
    </Button>
  );
};

export default DefaultButton;
