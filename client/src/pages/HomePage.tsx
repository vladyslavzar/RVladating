import { FC, useEffect, useState } from "react";

const HomePage: FC = (props) => {
    const [backendData, setBackendData] = useState<any>([{}])

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        )
    }, [])

    return (
        <div>
            <a href="/reg">registration form</a>

            <p>here we get array from server</p>
            {(typeof backendData.testArray === "undefined") ? (
                <p>loading</p>
            )  : (
                backendData.testArray.map((element: string, i: number) => (
                    <p key={i}>{element}</p>
                ))
            )}
           
        </div>
    );
}

export default HomePage;
