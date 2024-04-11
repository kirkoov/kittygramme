import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import { registerUser } from "../../utils/api";

import logoIcon from "../../images/logo.svg";

import { FormContainer } from "../ui/form-container/form-container";
import { Input } from "../ui/input/input";
import { ButtonForm } from "../ui/button-form/button-form";

import styles from "./sign-up.module.css";

export const SignUp = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [errorDoublePassword, setErrorDoublePassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const history = useHistory();

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    if (!userData.username) {
      setErrorLogin("Username is a required field");
      return false;
    }
    if (!userData.password) {
      setErrorPassword("Password is a required field");
      return false;
    }
    if (!userData.password2) {
      setErrorDoublePassword("Password is a required field");
      return false;
    }
    if (userData.password !== userData.password2) {
      setErrorDoublePassword("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    errorDoublePassword && setErrorDoublePassword("");
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

    checkValid() &&
      registerUser(userData.username, userData.password)
        .then((res) => {
          if (res && res.username) {
            history.replace({ pathname: "/signin" });
          }
        })
        .catch((err) => {
          if (typeof err.username === "object") {
            setErrorLogin("This username is already taken");
          } else if (typeof err.password === "object") {
            setErrorPassword(
              "A password should contain not less than 8 chars and never be fully numeric"
            );
          } else {
            setErrorDoublePassword("Server error");
          }
        });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.logo} mb-16`} src={logoIcon} alt="Logo" />
      <h1
        className={`text text_type_h1 text_color_primary mb-20 ${styles.title}`}
      >
        Sign up
      </h1>
      <p
        className={`text text_type_medium-20 text_color_input mb-10 ${styles.subtitle}`}
      >
        Please sign up to use Kittygram
      </p>
      <FormContainer>
        <form className={styles.form}>
          <Input
            onChange={onChangeInput}
            name="username"
            type="text"
            id={1}
            placeholder="Username"
            error={errorLogin}
          />
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id={2}
            placeholder="Password"
            error={errorPassword}
          />
          <Input
            onChange={onChangeInput}
            name="password2"
            type="password"
            id={3}
            placeholder="Retype your password"
            error={errorDoublePassword}
          />
          <p
            className={`text text_type_small text_color_input ${styles.agreement}`}
          >
            By signing up with this website you covenant and agree to post feline pix only and no canine ones.
          </p>
          <ButtonForm text="Sign up" onClick={handleSubmit} />
          <p className="text text_type_small text_color_input mt-5 mb-5">or</p>
        </form>
        <div className={styles.footer}>
          <NavLink
            to="/signin"
            className={`text text_type_medium-16 text_color_link ${styles.nav}`}
          >
            Registered already? Log in
          </NavLink>
        </div>
      </FormContainer>
    </section>
  );
};
