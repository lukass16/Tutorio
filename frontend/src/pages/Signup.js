import React from "react";
import { useFormik } from "formik";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
    },
    onSubmit: (values) => {
      const valuestosend = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        password: values.password,
        description: null,
        subjects: [],
        lessons: [],
      };
      fetch(`http://localhost:5000/api/teachers/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...valuestosend,
        }),
      })
      .then((res) => res.json()).then((data) => console.log(data))
      
      //alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">First Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <label htmlFor="surname">Last Name</label>
      <input
        id="surname"
        name="surname"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.surname}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.phone}
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

export default Signup;
