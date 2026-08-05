import { useState } from "react";
import "../styles/Login.css";
import { loginUser } from "../api/auth.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
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
   
      await loginUser(formData);
     alert("Login Successfull")

     
   
       
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
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