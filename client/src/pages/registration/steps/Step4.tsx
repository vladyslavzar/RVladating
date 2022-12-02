import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";
import { DatePicker, Space } from "antd";

const Step4: FC<StepProps> = ({ nextStep, param }) => {
  const [userData, setUserData] = useState<any>({
    //profile info
    name: "",
    login: "",
    sex: "",
    dof: "",
    goal: "",
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
  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <h1>Step 4 Final</h1>

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
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.sex}
        name="name"
        id="name"
        size="small"
        isError={false}
        placeHolder="Name"
        type="text"
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.dof}
        name="name"
        id="name"
        size="small"
        isError={false}
        placeHolder="Date of birth"
        type="text"
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.goal}
        name="name"
        id="name"
        size="small"
        isError={false}
        placeHolder="Goal"
        type="text"
      />
    </StepLayout>
  );
};

export default Step4;
