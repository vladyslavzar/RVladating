import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";
import { Progress } from "antd";

const Step3: FC<StepProps> = ({ nextStep, param }) => {
  const [userData, setUserData] = useState<any>({
    password: "",
  });

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
        "http://localhost:5000/users/register/password",

        JSON.stringify({
          email: param,
          password: userData.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        console.log(response);
        nextStep(`${param}`);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <Progress
        type="circle"
        percent={50}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.email}
        name="password"
        id="password"
        size="small"
        isError={false}
        placeHolder="Password"
        type="password"
      />
    </StepLayout>
  );
};

export default Step3;
