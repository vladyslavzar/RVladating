import { FC, useState, useEffect } from "react";
import axios from "axios";
import Container from "../../layout/Container";
import { TextArea, DefaultButton } from "../../components";

const Registration: FC = (props) => {
  const [userData, setUserData] = useState<any>({
    data: "",
  });

  function handle(e: any) {
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
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <form onSubmit={(e) => submit(e)}>
        <TextArea
          inputHandler={(e: any) => handle(e)}
          value={userData.data}
          name="data"
          id="data"
          size="small"
          isError={false}
          placeHolder="username"
        />
        <DefaultButton type="submit" text="submit" isFilled={false} />
      </form>
      <p>
        here must be response (request and response getting work fine, you can
        see response in dev tools)
      </p>
    </Container>
  );
};

export default Registration;
