import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import * as yup from "yup";

const Schema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
  phonenumber: yup.string().required("Please use a Valid Phone Number")
});

const defaultVal = {
    username: "",
    password: "",
    phonenumber: "",
  }


function Signup() {
  const [signinState, setsigninState] = useState(defaultVal);
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState({
    username: "",
    password: "",
    phonenumber: "",
  });

  // const history = useHistory();

  useEffect(() => {
    Schema.isValid(signinState).then((valid) => {
      setIsValid(!valid);
    });
  }, [signinState]);


  const formSubmit = (e) => {
    e.preventDefault();
    // axios.post(, signinState)
    // .then(res => {
    //   localStorage.setItem("token", res.data.token);
    //   history.push();
    // })
    // .catch(err => {console.log(err)});
    setsigninState(defaultVal)
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
            {err.password.length > 0 ? <p>{err.password}</p> : null}


            <label htmlFor="phonenumber">Phone Number:</label>
            <input
            type="text"
            placeholder="Phone #"
            id="phonenumber"
            name="phonenumber"
            value={signinState.phonenumber}
            onChange={inputChange}
            />
            {err.phonenumber.length > 0 ? <p>{err.phonenumber}</p> : null}
          
        <button type="submit" disabled={isValid}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;