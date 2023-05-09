import React from "react";
import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const SignUpschema = yup.object().shape({
    userId: yup.string().min(3,"UserId must be at least 3 characters long").required(),
    userName: yup.string().min(5,"UserName must be at least 5 characters long").required(),
    emailId: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(8,'Password must be at least 8 characters long')
    .matches(passwordRules, { message: "Must conatin integer and lowercase and uppercase letters" })
    .required("Required"),
  });