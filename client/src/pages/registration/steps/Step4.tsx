import { FC, useState } from "react";
import axios from "axios";
import { TextArea } from "../../../components";
import { StepProps } from "../../../types/index";
import StepLayout from "./StepLayout";

const Step4: FC<StepProps> = ({ nextStep, param }) => {
    const [userData, setUserData] = useState<any>({
        //profile info
        name: "",
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
        .post (
          "http://localhost:5000/users/register/name",
        
          JSON.stringify(
          {
            email: param,
            name: userData.name,
          }
          ),
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
        }
      );
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
      </StepLayout>
    )
}

export default Step4;
