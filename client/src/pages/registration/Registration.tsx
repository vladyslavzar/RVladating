import { FC, useState } from "react";
import { Step1, Step2, Step3, Step4 } from "./steps";

const Registration: FC = () => {
  const [step, setStep] = useState(1);
  const [stepParam, setStepParam] = useState<string>();

  const nextStep = (param: string) => {
    setStep(step + 1);
    setStepParam(param);
  };

  return (
    <>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} param={stepParam} />}
      {step === 3 && <Step3 nextStep={nextStep} param={stepParam} />}
      {step === 4 && <Step4 nextStep={nextStep} param={stepParam} />}

    </>
  );
};

export default Registration;
