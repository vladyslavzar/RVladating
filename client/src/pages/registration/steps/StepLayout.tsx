import { FC } from "react";
import Container from "../../../layout/Container";
import { DefaultButton } from "../../../components";
import { StepLayoutProps } from "../../../types/index";
import { Space } from "antd";

const StepLayout: FC<StepLayoutProps> = ({ submitHandler, children }) => {
  return (
    <Container>
      <form onSubmit={(e) => submitHandler(e)} className="stepForm">
        <Space direction="vertical" align="center" size="middle">
          {children}
          <DefaultButton type="submit" text="submit" isFilled={false} />
        </Space>
      </form>
    </Container>
  );
};

export default StepLayout;
