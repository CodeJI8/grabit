import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import "./App.css";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes></>
  );
}

export default App;