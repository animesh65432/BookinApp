import { Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";

const Hello = () => {
  return <>Hello</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout childrean={<Hello />} />}></Route>
        <Route
          path="/register"
          element={<Layout childrean={<Register />} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
