import axios from "axios";
import React, { useState } from "react";

import * as yup from "yup";

const Schema = yup.object().shape({
    password: yup.string().required("Password is Required"),
    passwordConf: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!")
    .required('Required'),
    phoneNumber: yup.string().required("Please use a Valid Phone Number")
  });





export default function EditUser(props) {
  const { user, toggleEdit, setUser } = props;

  const initialFormValues = {
    password: "",
    passwordConf: "",
    phoneNumber: "",
  };

  //initial form errors
const initialFormErrors = {
    password: "",
    passwordConf: "",
    phoneNumber: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const editedUser = {
    password: formValues.password.trim(),
    passwordConf: formValues.passwordConf.trim(),
    phoneNumber: formValues.phoneNumber.trim(),
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://ptct-water-my-plants4.herokuapp.com/api/users/${user.user_id}`,
        editedUser
      )
      .then((res) => {
        console.log("Edited:", res);
        axios
          .get(`https://ptct-water-my-plants4.herokuapp.com/api/users`)
          .then((res) => setUser(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    toggleEdit(false);
  };

  const handleCancel = () => {
    toggleEdit(false);
  };

  const validate = (e) => {
    yup
      .reach(Schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setFormErrors({...formErrors, [e.target.name]: "" });
      })
      .catch((error) => {
        console.log(error.errors);
        setFormErrors({...formErrors, [e.target.name]: error.errors[0]})
      })
  };

  const onChange = (e) => {
    e.persist();
    validate(e);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(e.target);
  };





  return (
    <div>
      <h3>Edit User Info:</h3>
      <form>
        <label>
          Change password:
          <br />
          <input
            type="text"
            name="password"
            value={formValues.password}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Confirm password:
          <br />
          <input
            type="text"
            name="passwordConf"
            value={formValues.passwordConf}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <br />
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={onChange}
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}