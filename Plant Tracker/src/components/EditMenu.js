import axios from "axios";
import React, { useState } from "react";

export default function EditMenu(props) {
  const { plant, toggleEdit, setPlants } = props;
 

  const initialFormValues = {
    plant_id: plant.plant_id,
    nickname: plant.nickname,
    species: plant.species,
    h2oFrequency: plant.h2oFrequency,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const editedPlant = {
    plant_id: 1,
    nickname: formValues.nickname.trim(),
    species: formValues.species.trim(),
    h2oFrequency: formValues.h2oFrequency.trim(),
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
        `https://ptct-water-my-plants4.herokuapp.com/api/plants/${plant.plant_id}`,
        editedPlant
      )
      .then((res) => {
        console.log("Edited:", res);
        axios
          .get("https://ptct-water-my-plants4.herokuapp.com/api/plants/")
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
            value={formValues.plant_id}
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
          <input
            type="text"
            name="species"
            value={formValues.species}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Watering Freqeuency:
          <br />
          <select
            name="h2oFrequency"
            value={formValues.h2oFrequency}
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