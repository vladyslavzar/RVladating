import { FC } from "react";
import Container from "../../../layout/Container";
import { DefaultButton } from "../../../components";
import { StepLayoutProps } from "../../../types/index";

const StepLayout: FC<StepLayoutProps> = ({ submitHandler, children }) => {
  return (
    <Container>
      <form onSubmit={(e) => submitHandler(e)}>
        {children}
        <DefaultButton type="submit" text="submit" isFilled={false} />
      </form>
    </Container>
  );
};

export default StepLayout;
