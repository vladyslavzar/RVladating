import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";

const Step1: FC<StepProps> = ({ nextStep }) => {
  const [userData, setUserData] = useState<any>({
    email: "",
    phone: "",
  });

  const [Response, setResponse] = useState();

  function handle(e: any) {
    e.preventDefault();

    const newData = { ...userData };
    newData[e.target.id] = e.target.value;
    setUserData(newData);
  }

  function submit(e: any) {
    e.preventDefault();

    console.log(userData);

    axios
      .post(
        "http://localhost:5000/api/register",
        {
          data: userData.data,
          email: userData.email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response: any) => {
        setResponse(response.data);
        console.log(response);
        setTimeout(nextStep, 1000);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.data}
        name="data"
        id="data"
        size="small"
        isError={false}
        placeHolder="username"
        type="text"
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.email}
        name="email"
        id="email"
        size="small"
        isError={false}
        placeHolder="Your E-mail"
        type="email"
      />
      <p>{Response}</p>
    </StepLayout>
  );
};

export default Step1;
