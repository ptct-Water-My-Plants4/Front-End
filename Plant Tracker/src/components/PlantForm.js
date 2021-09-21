import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "../Schema/PlantFormSchema";




//Initial form state
const initialFormValues = {
  id: "",
  nickname: "",
  species: "",
  h20Frequency: "",
};

//initial form errors
const initialFormErrors = {
    id: "",
    nickname: "",
    species: "",
    h20Frequency: "",
};

//disable submit button
const initialDisabled = true;



export default function PlantForm(props) {
  const { setList } = props;


  //form state
  const [formValues, setFormValues] = useState(initialFormValues);
  //form errors state
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  //disable button state
  const [disabled, setDisabled] = useState(initialDisabled);

  //helper functions

  //validation helper
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };
  //change handler
  const onChange = (evt) => {
    const { name, value } = evt.target;
    //validate formValues
    validate(name, value);
    //set onChange to state
    setFormValues({ ...formValues, [name]: value });
  };

  //submit handler
  const onSubmit = (evt) => {
    //stop default reload upon submission
    evt.preventDefault();

    //collect new formValues
    const newPlant = {
      id: 1,
      nickname: formValues.nickName.trim(),
      species: formValues.species.trim(),
      h20frequency: formValues.h20frequency.trim(),
    };

    //post newPlant to endpoint, USING FAKE API AS PLACEHOLDER
    axios
      .post("https://fakeapi.com", newPlant)
      .then((res) => {
        console.log("NEW RESPONSE", res);
        axios
          .get("https://fakeapi.com")
          .then((res) => setList(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        debugger;
      });
    setFormValues(initialFormValues);
  };

  //setDisabled accordingly every time formValues changes
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div>
        <section className="plant-form-section">
          <h2>Add a new plant</h2>
          <form onSubmit={onSubmit}>
              {/* id input */}
              <div className="input-div even">
                <div className="error-div">{formErrors.id}</div>
                <label id="id">id</label>
                <input
                  id="id"
                  type="text"
                  name="id"
                  value={formValues.id}
                  onChange={onChange}
                  placeholder="create an id"
                  maxLength="10"
                  size="10"
                />
              </div>

              {/* nickname input */}
              <div className="input-div odd">
                <div className="error-div">{formErrors.nickname}</div>
                <label id="nickname">Nickname</label>
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  value={formValues.nickname}
                  onChange={onChange}
                  placeholder="What do you call this plant?"
                  maxLength="30"
                  size="30"
                />
              </div>

            {/* species input */}
            <div className="input-div odd">
                <div className="error-div">{formErrors.species}</div>
                <label id="species">Species</label>
                <input
                  id="species"
                  type="text"
                  name="species"
                  value={formValues.species}
                  onChange={onChange}
                  placeholder="What kind of plant is it?"
                  maxLength="30"
                  size="30"
                />
              </div>

            {/* h20 frequency dropdown */}
             <div className="input-div even">
                <div className="error-div">{formErrors.h20frequency}</div>
                <label id="h20frequency">Water Freqeuncy</label>
                <select
                  id="h20frequency"
                  name="h20frequency"
                  value={formValues.h20frequency}
                  onChange={onChange}
                >
                  <option value="">-- select watering frequency --</option>
                  <option value="daily">Daily</option>
                  <option value="every other day">Every other day</option>
                  <option value="weekly">Weekly</option>
                  <option value="twice a week">Twice a week</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button disabled={disabled}>Submit Recipe</button>
          </form>
        </section>
    </div>
  );
}