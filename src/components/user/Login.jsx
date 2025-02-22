import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const OnchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak ❌");
    } else if (password.match(/[A-Z]/) && password.match(/\d/) && password.match(/[!@#$%^&*]/)) {
      setPasswordStrength("Strong ✅");
    } else {
      setPasswordStrength("Medium ⚠️");
    }
  };

  const { email, password } = FormData;
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div
      className="container my-5 p-5"
      style={{
        width: "600px",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      <h1 className="text-center">User Login</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            name="email"
            value={FormData.email}
            onChange={OnchangeHandler}
            type="email"
            className="form-control"
            id="exampleInputEmail13"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              name="password"
              value={FormData.password}
              onChange={OnchangeHandler}
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <small className="text-muted">Password Strength: {passwordStrength}</small>
        </div>
        <div className="d-grid col-5 mx-auto">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
