import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios"

const Schema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});

const defaultVal = {
    username: "",
    password: "",
  }


function loginForm() {
  const [loginState, setloginState] = useState(defaultVal);
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState({
    username: "",
    password: ""
  });

  const history = useHistory();

  useEffect(() => {
    Schema.isValid(loginState).then((valid) => {
      setIsValid(!valid);
    });
  }, [loginState]);


  const formSubmit = (e) => {
    e.preventDefault();
    axios.post("https://ptct-secret-recipes.herokuapp.com/api/auth/login", loginState)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      history.push("/plant-list");
    })
    .catch(err => {console.log(err)});
    setloginState(defaultVal)
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
    setloginState({ ...loginState, [e.target.name]: e.target.value });
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
              value={loginState.username}
              onChange={inputChange}
            />
            {err.username.length > 0 ? <p>{err.username}</p> : null}
          
        
        
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={loginState.password}
              onChange={inputChange}
            />
            {err.password.length > 0 ? <p>{err.password}</p> : null}
          
        <button type="submit" disabled={isValid}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default loginForm;