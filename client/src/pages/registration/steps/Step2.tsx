import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";

const Step2: FC<StepProps> = ({ nextStep }) => {
  return (
    <StepLayout submitHandler={nextStep}>
      <TextArea
        inputHandler={(e: any) => setTimeout(() => 0, 1)}
        value={"code"}
        name="data"
        id="data"
        size="small"
        isError={false}
        placeHolder="code"
        type="text"
      />
      <p>**response**</p>
    </StepLayout>
  );
};

export default Step2;
