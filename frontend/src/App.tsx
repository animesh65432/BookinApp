import { Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

const Hello = () => {
  return <>Hello</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout childrean={<Hello />} />}></Route>
      </Routes>
    </>
  );
}

export default App;
