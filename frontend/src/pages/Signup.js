import React, { useState } from "react";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import ImageUpload from "../shared/formElements/ImageUpload";

const Signup = () => {
  const [imageFile, setImageFile] = useState(null);

  const onImageInput = (id, file, isValid) => {
    setImageFile(file);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      description: "",
      password: "",
      subjects: "",
    },
    onSubmit: (values) => {
      //* Changed the type of request sent (fundamentally the same, but now we can send files, only difference is the way we pass the key values)
      // stroing FormData API in a variable
      const formData = new FormData(); // to this object we can add normal text data as well as files

      // adding normal text data
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("description", values.description);
      formData.append("subjects", values.subjects);

      // adding files
      if(!imageFile) {
        console.log("Failed to select file, please select again.");
        return;
      }
      console.log(imageFile);
      formData.append("image", imageFile);

      // the fetch API automatically adds the right headers with FormData
      fetch(`http://localhost:5000/api/teachers/signup`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Box>
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

          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
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

          <label htmlFor="subjects">Subject</label>
          <input
            id="subjects"
            name="subjects"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.subjects}
          />

          <button type="submit">Submit</button>
        </form>
      </Box>
      <Box>
        {/* Added ImageUpload component - uses the onInput function to retrieve the file that was passed and assign it to the imageFile state*/}
        <ImageUpload id="image" onInput={onImageInput} />
      </Box>
    </>
  );
};

export default Signup;
