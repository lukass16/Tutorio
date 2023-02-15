import React from "react";
import { useFormik } from "formik";
const bcrypt = require("bcryptjs");

const LoginStudent = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      let hashedPassword;
      hashedPassword = bcrypt.hash(values.password, 12);
        console.log(hashedPassword);

      //const valuestosend = {
      //  email: values.email,
      //  password: hashedPassword,
      //};
      console.log("break1")
      fetch(`http://localhost:5000/api/students/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: values.email, password: hashedPassword.stringify()
        })
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginStudent;
