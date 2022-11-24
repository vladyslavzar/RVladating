import { FC, useState } from "react";
import { Step1, Step2 } from "./steps";

const Registration: FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} />}
    </>
  );
};

export default Registration;
