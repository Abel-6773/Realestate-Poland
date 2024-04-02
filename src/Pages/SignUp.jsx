import React from "react";
import SignUpForm from "../Components/SignInUp/SignUpForm";
import { NavLink } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="signIn containerXl">
      <header>
        <h1 className="pageHeader txtCntr">Welcome!</h1>
      </header>
      <main>
        <SignUpForm />
        <NavLink to="/sign-in" className="registerLink">
          Sign In instead
        </NavLink>
      </main>
    </div>
  );
}
