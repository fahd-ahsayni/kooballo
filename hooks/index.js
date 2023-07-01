import { t } from "../i18n";
import React from "react";

export const useInputState = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (text) => setValue(text);
  return [value, handleChange];
};

export const useFormValidationState = () => {
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const validateForm = (email, password) => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is required and should include '@'");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "" || password.length < 8) {
      setPasswordError("Password is required and should be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return { emailError, passwordError, validateForm };
};
