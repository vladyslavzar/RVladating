import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";

const Step1: FC<StepProps> = ({ nextStep }) => {
  const [userData, setUserData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
        "http://localhost:5000/api/register",
        
        JSON.stringify(
          {
            firstName: userData.firstName, 
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
          }
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        setResponse(response.data.message);
        console.log(response);
        //next step removed because verification page will redirect u to next step
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  return (
    <StepLayout submitHandler={(e) => submit(e)}>
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.firstName}
        name="firstName"
        id="firstName"
        size="small"
        isError={false}
        placeHolder="First Name"
        type="text"
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.lastName}
        name="lastName"
        id="lastName"
        size="small"
        isError={false}
        placeHolder="Last Name"
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
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.password}
        name="password"
        id="password"
        size="small"
        isError={false}
        placeHolder="Create Password"
        type="password"
      />
      <p>{Response}</p>
    </StepLayout>
  );
};

export default Step1;
