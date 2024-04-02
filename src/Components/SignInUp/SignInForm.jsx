import "./SignInForm.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "../../assets/svg/keyboardArrowRightIcon.svg?react";
let initialFormData = {
  email: "",
  password: "",
};
export default function SignInForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const formUpdater = function (e) {
    setFormData((c) => {
      return { ...c, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };
  const viewPassword = function () {
    setShowPassword((c) => {
      return !c;
    });
    console.log(showPassword);
  };

  return (
    <form>
      <input
        onChange={formUpdater}
        className="emailInput"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
      />
      <div className="passwordInputDiv">
        <input
          onChange={formUpdater}
          className="passwordInput"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
        />
        <img
          onClick={viewPassword}
          className="showPassword"
          src="../assets/svg/visibilityIcon.svg"
          alt=""
        />
      </div>
      <NavLink className="forgotPasswordLink">Forgot Password</NavLink>
      <div className="signInBar">
        <h2 className="signInText">Sign In</h2>
        <button className="signInButton">
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
