import { NavLink } from "react-router-dom";
import SignInForm from "../Components/SignInUp/SignInForm";

export default function SignIn() {
  return (
    <div className="signIn containerXl">
      <header>
        <h1 className="pageHeader txtCntr">WelcomeBack!</h1>
      </header>
      <main>
        <SignInForm />
        <NavLink to="../sign-up" className="registerLink">
          Sign Up instead
        </NavLink>
      </main>
    </div>
  );
}
