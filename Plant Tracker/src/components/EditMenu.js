import axios from "axios";
import React, { useState } from "react";

export default function EditMenu(props) {
  const { plant, toggleEdit, setPlants } = props;
  //deleted edit from props for linter

  const initialFormValues = {
    id: plant.id,
    nickname: plant.nickname,
    species: plant.species,
    h20frequency: plant.h20frequency,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const editedPlant = {
    id: 1,
    nickname: formValues.nickname.trim(),
    species: formValues.species.trim(),
    h20frequency: formValues.h20frequency.trim(),
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(evt.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://fakeapi.com`,
        editedPlant
      )
      .then((res) => {
        console.log("Edited:", res);
        axios
          .get("https://fakeapi.com")
          .then((res) => setPlants(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    toggleEdit(false);
  };

  const handleCancel = () => {
    toggleEdit(false);
  };
  return (
    <div>
      <h3>Edit Plant:</h3>
      <form>
        <label>
          Plant ID:
          <br />
          <input
            type="text"
            name="name"
            value={formValues.id}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Plant nickname:
          <br />
          <input
            type="text"
            name="nickname"
            value={formValues.nickname}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Plant Species:
          <br />
          <select
            name="species"
            value={formValues.species}
            onChange={onChange}
          >
            <option value="">-- select watering frequency --</option>
            <option value="daily">Daily</option>
            <option value="every other day">Every other day</option>
            <option value="weekly">Weekly</option>
            <option value="twice a week">twice a week</option>
            <option value="biweekly">biweekly</option>
            <option value="monthly">monthly</option>
          </select>
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}