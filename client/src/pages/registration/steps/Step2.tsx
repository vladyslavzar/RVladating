import { FC, useState, useEffect } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";
import { Progress } from "antd";

const Step2: FC<StepProps> = ({ nextStep, param }) => {
  const [response, setResponse] = useState<any>();

  const [userData, setUserData] = useState<any>({
    code: "",
  });

  function handle(e: any) {
    e.preventDefault();

    const newData = { ...userData };
    newData[e.target.id] = e.target.value;
    setUserData(newData);
  }

  /*
   * if user want to he can copy/paste verification code in form directly
   */
  function submit(e: any) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/users/register/verify",
        JSON.stringify({
          email: param,
          code: userData.code,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        setResponse(response.data.message);
        if (response.data.message == "successfully verified user") {
          nextStep(`${param}`);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setResponse(error.response.data.message);
      });
  }

  /*
   * here we check if user is verified from link to skip step
   */
  useEffect(() => {
    async function sendRequest() {
      while (true) {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/register/verify/${param}`
          );
          setResponse(response.data.message);
          if (response.data.message == "user is verified") {
            return;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    sendRequest().then(() => {
      nextStep(`${param}`);
    });
  }, []);

  return (
    <StepLayout submitHandler={(e: any) => submit(e)}>
      <Progress
        type="circle"
        percent={25}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
      />
      <TextArea
        inputHandler={(e: any) => handle(e)}
        value={userData.code}
        name="code"
        id="code"
        size="small"
        isError={false}
        placeHolder="code"
        type="text"
      />
      <p>{param}</p>
      <p>response: {response}</p>
    </StepLayout>
  );
};

export default Step2;
