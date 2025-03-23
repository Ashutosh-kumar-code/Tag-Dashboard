import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";


const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/admin/signup`, {
        name: formData.firstName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-main-img">
      <div className="signup-glassmorphics-container">
        <h2>Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-sm text-white mb-2">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your name"
              className="signup-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="signup-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="signup-lable">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="signup-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="signup-lable">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              className="signup-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-submit">
            <button type="submit">Signup</button>
          </div>
        </form>
        <p className="copy-right">Tag Project</p>
      </div>
    </div>
  );
};

export default Signup;
