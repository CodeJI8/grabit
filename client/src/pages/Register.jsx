import { useState } from "react";
import { registerUser } from "../api/auth.js";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role_id: "",
    role: "",
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
  toast.success("Registration Successful");
    

      navigate("/login");
    }catch (err) {
    const message =
        err.response?.data?.message || "Registration failed";

        toast.error(message);
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
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Role ID</label>
            <input
              type="number"
              name="role_id"
              placeholder="Enter role ID"
              value={formData.role_id}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Enter role"
              value={formData.role}
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
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;