import { useState } from "react";
import { registerUser } from "../api/auth.js";
import "../styles/Register.css";
import { Link } from "react-router-dom";


function Register(){

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();


  try {

  await registerUser(formData);
  alert("Registration Successfull")

    
  } catch (err) {

    console.log(err)
      alert(err)
    
  }
 
};


return (
  <div className="register-container">
    <div className="register-card">
      <h1>Grabit</h1>
      <p>Create your account</p>

    <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
              name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
                  name="email"
            placeholder="Enter your email"
          value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
                     name="password"
            placeholder="Enter your password"
          value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Create Account
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);


}


export default Register;

