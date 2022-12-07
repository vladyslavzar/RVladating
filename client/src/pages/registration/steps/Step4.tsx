import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";
import { DatePicker, Select, Progress } from "antd";
import type { DatePickerProps } from "antd";

const Step4: FC<StepProps> = ({ nextStep, param }) => {
  const [userData, setUserData] = useState<any>({
    //profile info
    name: "",
    login: "",
    sex: "male",
    dof: "",
    goal: "dating",
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
        "http://localhost:5000/users/register/name",

        JSON.stringify({
          email: param,
          name: userData.name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        console.log(response);
        //redirect to account
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  const datePick: DatePickerProps["onChange"] = (date, dateString) => {
    const newData = { ...userData };
    newData.dof = dateString;
    setUserData(newData);
  };

  const handleSex = (value: string) => {
    const newData = { ...userData };
    newData.sex = value;
    setUserData(newData);
  };

  const handleGoal = (value: string) => {
    const newData = { ...userData };
    newData.goal = value;
    setUserData(newData);
  };

  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <Progress
        type="circle"
        percent={75}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.name}
        name="name"
        id="name"
        size="small"
        isError={false}
        placeHolder="Name"
        type="text"
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.login}
        name="login"
        id="login"
        size="small"
        isError={false}
        placeHolder="Login"
        type="text"
      />
      <Select
        defaultValue="male"
        style={{ width: 120 }}
        onChange={handleSex}
        options={[
          {
            value: "male",
            label: "male",
          },
          {
            value: "female",
            label: "female",
          },
          {
            value: "other",
            label: "other",
          },
        ]}
      />
      <DatePicker onChange={datePick} />
      <Select
        defaultValue="dating"
        style={{ width: 120 }}
        onChange={handleGoal}
        options={[
          {
            value: "dating",
            label: "dating",
          },
          {
            value: "friendship",
            label: "friendship",
          },
        ]}
      />
    </StepLayout>
  );
};

export default Step4;
