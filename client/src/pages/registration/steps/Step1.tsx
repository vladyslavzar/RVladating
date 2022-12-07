import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";
import { Progress } from "antd";

const Step1: FC<StepProps> = ({ nextStep }) => {
  const [userData, setUserData] = useState<any>({
    email: "",
  });

  const [Response, setResponse] = useState("");

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
        "http://localhost:5000/users/register",

        JSON.stringify({
          email: userData.email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        setResponse(response.data.message);
        console.log(response);
        localStorage.setItem("email", userData.email);
        setTimeout(() => {
          nextStep(userData.email);
        }, 3000);
      })
      .catch((error: any) => {
        console.error(error);
        setResponse(error.response.data.message);
      });
  }

  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <Progress
        type="circle"
        percent={0}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
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
