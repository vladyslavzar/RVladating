import { FC } from "react";
import Container from "../../../layout/Container";
import { DefaultButton } from "../../../components";
import { StepLayoutProps } from "../../../types/index";
import { Space } from "antd";

const StepLayout: FC<StepLayoutProps> = ({ submitHandler, children }) => {
  return (
    <Container>
      <form onSubmit={(e) => submitHandler(e)}>
        <Space direction="vertical">
          {children}
          <DefaultButton type="submit" text="submit" isFilled={false} />
        </Space>
      </form>
    </Container>
  );
};

export default StepLayout;
