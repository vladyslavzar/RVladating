import { type } from "os";
import React, { useEffect, useState } from "react";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
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
            {(typeof backendData.testArray === "undefined") ? (
                <p>loading</p>
            )  : (
                backendData.testArray.map((element: any, i: any) => (
                    <p key={i}>{element}</p>
                ))
            )}
           
        </div>
    );
}

export default HomePage;
