import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import { signin } from "../services/AuthServices";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigation = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the ref is not null before accessing it
    if (formRef.current) {
      const email = formRef.current.querySelector("input[type='email']").value;
      const password = formRef.current.querySelector("input[type='password']").value;
      
      try {
        const response = await signin(email, password);
        const token = response.headers["authorization"];

        if (token) {
          localStorage.setItem("authToken", token);
        }

        if (response && response.data) {
          const roles = response.data.roles;
          if (roles.includes("ROLE_ADMIN")) {
            navigation("/admin-dashboard");
          } else {
            localStorage.setItem("email",email)
            navigation("/user-dashboard");
          }
        }
      } catch (error) {
        console.error("An error occurred during sign-in:", error);
        toast.error("Check your email and password", { position: "top-left" });
      }
    } else {
      console.error("Form reference is null, unable to access input fields.");
    }
  };

  return (
    <div className="container">
      <form className="form" ref={formRef}>
        <p className="form-title">Login to Your Account</p>
        <div className="login-input-container">
          <input type="email" placeholder="Enter email" required />
          <span></span>
        </div>
        <div className="login-input-container">
          <input type="password" placeholder="Enter password" required />
        </div>
        <div className="register-link">
          Create New Account? <Link to='/register'>Register</Link>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;