import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
// import "../../App.css"

const Schema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
  phoneNumber: yup.string().required("Please use a Valid Phone Number")
});

const defaultVal = {
    username: "",
    password: "",
    phoneNumber: "",
  }


function Signup() {
  const [signinState, setsigninState] = useState(defaultVal);
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });

  // const history = useHistory();

  useEffect(() => {
    Schema.isValid(signinState).then((valid) => {
      setIsValid(!valid);
    });
  }, [signinState]);


  const formSubmit = (e) => {
    e.preventDefault();  
  

  const newUser = {
    username: signinState.username.trim(),
    password: signinState.password.trim(),
    phoneNumber: signinState.phoneNumber.trim(),
  };

  axios
  .post(
    "https://ptct-water-my-plants4.herokuapp.com/api/auth/register",
    newUser
       )
  .then((res) => {
    console.log("NEW RESPONSE", res);
                 })
  .catch((err) => {
    debugger;
    console.log(err);
                  });
  setsigninState(defaultVal);

                };


  const validate = (e) => {
    yup
      .reach(Schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErr({...err, [e.target.name]: "" });
      })
      .catch((error) => {
        console.log(error.errors);
        setErr({...err, [e.target.name]: error.errors[0]})
      })
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setsigninState({ ...signinState, [e.target.name]: e.target.value });
  };




  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formSubmit}>
          <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              value={signinState.username}
              onChange={inputChange}
            />
            {err.username.length > 0 ? <p>{err.username}</p> : null}
          
        
        
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={signinState.password}
              onChange={inputChange}
            />
            {err.password.length > 0 ? <p className="error">{err.password}</p> : null}


            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
            type="text"
            placeholder="Phone #"
            id="phoneNumber"
            name="phoneNumber"
            value={signinState.phoneNumber}
            onChange={inputChange}
            />
            {err.phoneNumber.length > 0 ? <p>{err.phoneNumber}</p> : null}
          
        <button type="submit" disabled={isValid}>
          Sign Up
        </button>
      </form>
    </div>
  );
  }

export default Signup;