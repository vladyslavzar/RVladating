import { FC, useState } from "react";
import axios from "axios";
import Container from "../../layout/Container";
import { TextArea, DefaultButton } from "../../components";

const Registration: FC = (props) => {
  const [userData, setUserData] = useState<any>({
    email: "",
    phone: "",
  });

  const [Response, setResponse] = useState();

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
        <DefaultButton type="submit" text="submit" isFilled={false} />
      </form>
      <p>
        {Response}
      </p>
    </Container>
  );
};

export default Registration;
