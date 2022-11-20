import { FC } from "react";
import { RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routing";
import HomePage from "./pages/home"

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
    //<RouterProvider router={routes} />
  );
};

export default App;
