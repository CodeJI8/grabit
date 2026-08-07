import { useState } from "react";
import "../styles/Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { useUser } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
   
      const response  = await loginUser(formData);
      setUser(response.data);
     alert("Login Successfull")
     navigate("/home")
       
     } catch (err) {
   
       console.log(err)
         alert(err)
       
     }

 

    // login API later
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Grabit</h1>
        <p>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;