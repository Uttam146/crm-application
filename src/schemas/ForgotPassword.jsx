import React from "react";
import * as yup from "yup";


export const ForgotPasword = yup.object().shape({
    emailId: yup.string().email("Please enter a valid email").required("Required"),
  });