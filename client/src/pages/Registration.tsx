import react, { useState, useEffect } from "react";
import axios from "axios";

const Registration: react.FC = (props) => {

    const [userData, setUserData] = useState<any>({
        data: ""
    });

    function handle(e: any) {
        const newData = {...userData};
        newData[e.target.id] = e.target.value;
        setUserData(newData);
    }

    function submit(e: any) {
        e.preventDefault();

        console.log(userData);

        axios.post("http://localhost:5000/api/register", {
            data: userData.data
        }, {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id="data" value={userData.data} name="data" type="text" />
                <button type="submit">submit</button>
            </form>
            <p>here must be response (request and response getting work fine, you can see response in dev tools)</p>
        </div>
    );
}

export default Registration;
