import { FC } from "react";
import { RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routing";
import HomePage from "./pages/home"
import Registration from "./pages/Registration"

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/reg" element={<Registration />} />
      </Routes>
    </BrowserRouter>
    //<RouterProvider router={routes} />
  );
};

export default App;
