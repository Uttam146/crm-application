import React from "react";
import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const SignUpschema = yup.object().shape({
    userId: yup.string().min(3,"UserId conatin at least 3 character").required(),
    userName: yup.string().min(5,"UserName conatin at least 5 character").required(),
    emailId: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(8,'Password conatin at least 8 characters')
    .matches(passwordRules, { message: "Must conatin Integer and lowercase and uppercase letters" })
    .required("Required"),
  });