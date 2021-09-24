import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";



//need to import plant form and plant list

//import user Sign Up form component
import axios from "axios";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import PlantForm from "./components/PlantForm";
import PlantList from "./components/PlantList";


function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log("failed to retrieve data:", err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
        <header>
        <h1>Plant Tracker</h1>
        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/add">Add Plant</Link>
          <Link to="/plant-list">My Plants</Link>
          <Link to="/" onClick={logout}>
            Log Out
          </Link>
        </nav>
        </header>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
          </Route>
        <PrivateRoute path="/add">
        <PlantForm list={list} setList={setList} />
        </PrivateRoute>
        <PrivateRoute path="/plant-list">
          <PlantList plants={list} setPlants={setList} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;